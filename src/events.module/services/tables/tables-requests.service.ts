import { RedisService } from 'nestjs-redis';
import { Observable } from 'rxjs';
import { common } from '../../../constants/common.const';
import { TableColumnDto } from '../../dto/table-column.dto';
import { EventCodesEnum } from '../../enums/event-codes.enum';
import { TableFilterDto } from '../../dto/table-filter.dto';
import { RequestTableDto } from '../../../core/dto/request-table.dto';
import { QueueService } from '../../../core/services/queue.service';
import { TableSortDto } from '../../dto/table-sort.dto';

/**
 * Сервис для работы с запросами к хранилищу
 * по событиями, связанных с таблицами
 */
export abstract class TablesRequestsService extends QueueService {
  /** Сервис доступа к хранилищу */
  protected abstract redisService: RedisService;

  /**
   * Загрузка колонок конкретной таблицы
   * @param {TableColumnDto} dto
   * @returns {Observable<any>}
   * @protected
   */
  protected getColumnsByUserId(dto: TableColumnDto): Observable<any> {
    const redis = this.redisService.getClient(common.redisName);
    return new Observable<any>((subscriber) => {
      const key = this.getRedisKey(dto);
      redis
        .get(key)
        .then((result: string | null) =>
          subscriber.next(result ? JSON.parse(result) : null),
        )
        .catch(() => subscriber.error())
        .finally(() => subscriber.complete());
    });
  }

  /**
   * Формирование ключа местоположения данных
   * @param {TableColumnDto} dto
   * @returns {string}
   * @private
   */
  private getRedisKey(dto: RequestTableDto): string {
    let key: string;
    switch (true) {
      case dto instanceof TableColumnDto:
        key = EventCodesEnum.TableColumn;
        break;
      case dto instanceof TableFilterDto:
        key = EventCodesEnum.TableFilter;
        break;
      case dto instanceof TableSortDto:
        key = EventCodesEnum.TableSort;
        break;
    }
    return `${dto.userId}:${key}:${dto.tableName}`;
  }

  protected setColumnsByUserId(dto: TableColumnDto): Observable<void> {
    const redis = this.redisService.getClient(common.redisName);
    const address = this.getRedisKey(dto);

    return new Observable((subscriber) => {
      redis
        .set(address, JSON.stringify(dto.columns))
        .then(() => subscriber.next())
        .catch((e) => subscriber.error(e))
        .finally(() => subscriber.complete());
    });
  }

  protected clearColumnsByUserId(dto: TableColumnDto): Observable<void> {
    const redis = this.redisService.getClient(common.redisName);
    const address = this.getRedisKey(dto);
    return new Observable((subscriber) => {
      redis
        .del(address)
        .then(() => subscriber.next())
        .catch((e) => subscriber.error(e))
        .finally(() => subscriber.complete());
    });
  }

  protected getFiltersByUserId(dto: TableFilterDto): Observable<any> {
    const redis = this.redisService.getClient(common.redisName);
    return new Observable<any>((subscriber) => {
      const key = this.getRedisKey(dto);
      redis
        .get(key)
        .then((result: string | null) =>
          subscriber.next(result ? JSON.parse(result) : null),
        )
        .catch(() => subscriber.error())
        .finally(() => subscriber.complete());
    });
  }

  protected setFiltersByUserId(dto: TableFilterDto): Observable<void> {
    const redis = this.redisService.getClient(common.redisName);
    const address = this.getRedisKey(dto);

    return new Observable((subscriber) => {
      redis
        .set(address, JSON.stringify(dto.filters))
        .then(() => subscriber.next())
        .catch((e) => subscriber.error(e))
        .finally(() => subscriber.complete());
    });
  }

  protected getSortByUserId(dto: TableSortDto): Observable<any> {
    const redis = this.redisService.getClient(common.redisName);
    return new Observable<any>((subscriber) => {
      const key = this.getRedisKey(dto);
      redis
        .get(key)
        .then((result: string | null) =>
          subscriber.next(result ? JSON.parse(result) : null),
        )
        .catch(() => subscriber.error())
        .finally(() => subscriber.complete());
    });
  }
  protected setSortByUserId(dto: TableSortDto): Observable<void> {
    const redis = this.redisService.getClient(common.redisName);
    const address = this.getRedisKey(dto);

    return new Observable((subscriber) => {
      redis
        .set(address, JSON.stringify(dto.sortValue))
        .then(() => subscriber.next())
        .catch((e) => subscriber.error(e))
        .finally(() => subscriber.complete());
    });
  }
}
