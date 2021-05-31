import { Observable, Subject, throwError } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { catchError, filter, finalize, map, take, tap } from 'rxjs/operators';

export abstract class QueueService {
  protected abstract switcher(dto: any): Observable<any>;
  private jobs: any[] = [];
  private queueStatus: boolean = false;
  private completed: Subject<any> = new Subject<any>();

  public addToQueue<T>(dto: any): Observable<T> {
    const id = uuid();
    return new Observable<any>((subscriber) => {
      this.completed
        .asObservable()
        .pipe(
          filter((jobVal: any) => jobVal.id === id),
          take(1),
          map(({ response }) => response),
          tap((response: any) => subscriber.next(response)),
          catchError((error) => {
            subscriber.error(error);
            return throwError(error);
          }),
          finalize(() => subscriber.complete()),
        )
        .subscribe();
      this.jobs.push({ dto: dto, id });
      this.checkQueue();
    });
  }

  private checkQueue(): void {
    if (this.queueStatus) {
      return;
    }
    this.queueStatus = true;
    this.runQueue();
  }

  private runQueue(): void {
    const job = this.jobs.shift();
    if (!job) {
      this.queueStatus = false;
      return;
    }
    this.switcher(job.dto)
      .pipe(
        tap((response: any) => this.completed.next({ id: job.id, response })),
        finalize(() => this.runQueue()),
      )
      .subscribe();
  }
}
