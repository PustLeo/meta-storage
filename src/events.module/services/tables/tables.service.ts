import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { MessageActionEnum } from '../../enums/message-action.enum';
import { tableColumns } from '../../../constants/table-columns/main';
import { TableColumnDto } from '../../dto/table-column.dto';
import { ActionTableColumnsEntity } from './entities/action-table-columns.entity';
import { IEventResponse } from '../../interfaces/event-response.interface';
import { RedisService } from 'nestjs-redis';
import { TablesRequestsService } from './tables-requests.service';
import { catchError, concatMap, map } from 'rxjs/operators';
import { TableFilterDto } from '../../dto/table-filter.dto';
import { ActionTableFiltersEntity } from './entities/action-table-filters.entity';
import { tableFilters } from '../../../constants/table-filters/main';
import { TableSortDto } from '../../dto/table-sort.dto';
import { ActionTableSortEntity } from './entities/action-table-sort.entity';
import { SortDirEnum } from '../../../core/enums/sort-dir.enum';

/**
 * Класс для работы с данными таблиц
 */
@Injectable()
export class TablesService extends TablesRequestsService {
  /**
   * Конструткор
   * @param {RedisService} redisService
   */
  constructor(protected redisService: RedisService) {
    super();
  }

  protected switcher(dto: any): Observable<any> {
    switch (true) {
      case dto instanceof TableColumnDto: {
        return this.tableColumnsHandler(dto);
      }
      case dto instanceof TableFilterDto: {
        return this.tableFiltersHandler(dto);
      }
      case dto instanceof TableSortDto: {
        return this.tableSortHandler(dto);
      }
    }
    return of(null);
  }

  /**
   * Обработка входных событый
   * @param {TableColumnDto} dto
   * @returns {Observable<IEventResponse>}
   */
  public tableColumnsHandler(dto: TableColumnDto): Observable<IEventResponse> {
    switch (dto.action) {
      case MessageActionEnum.Get: {
        return this.getTableColumns(dto);
      }
      case MessageActionEnum.Set: {
        return this.setTableColumns(dto);
      }
      case MessageActionEnum.Clear: {
        return this.clearTableColumns(dto);
      }
    }
    return of(null);
  }

  /**
   * Обработка событий, связанных с загрузкой
   * столбцов конкретной таблицы
   * @param {TableColumnDto} dto
   * @returns {Observable<IEventResponse>}
   * @private
   */
  private getTableColumns(dto: TableColumnDto): Observable<IEventResponse> {
    return this.getColumnsByUserId(dto).pipe(
      catchError((error: any) => {
        return of({});
      }),
      map((personalList: any | null) => personalList ?? {}),
      map((personalList: any) => {
        const entity = new ActionTableColumnsEntity(
          dto.tableName,
          dto.action,
          tableColumns[dto.tableName],
          personalList,
        );
        return entity.success().result;
      }),
    );
  }

  /**
   * Обработка событий, связанных с изменением
   * столбцов конкретной таблицы, для конкретного пользователя
   * @param {TableColumnDto} dto
   * @returns {Observable<IEventResponse>}
   * @private
   */
  private setTableColumns(dto: TableColumnDto): Observable<IEventResponse> {
    const entity = new ActionTableColumnsEntity(
      dto.tableName,
      dto.action,
      tableColumns[dto.tableName],
    );
    return this.getColumnsByUserId(dto).pipe(
      concatMap((cols: any) => {
        dto.mergeSavedCol(cols);
        return this.setColumnsByUserId(dto);
      }),
      map(() => entity.success().result),
      catchError(() => of(entity.error().result)),
    );
  }

  private clearTableColumns(dto: TableColumnDto): Observable<IEventResponse> {
    const entity = new ActionTableColumnsEntity(
      dto.tableName,
      dto.action,
      tableColumns[dto.tableName],
    );
    return this.clearColumnsByUserId(dto).pipe(
      map(() => entity.success().result),
      catchError(() => of(entity.error().result)),
    );
  }

  public tableFiltersHandler(dto: TableFilterDto): Observable<IEventResponse> {
    switch (dto.action) {
      case MessageActionEnum.Get: {
        return this.getFiltersHandler(dto);
      }
      case MessageActionEnum.Set: {
        return this.setFiltersHandler(dto);
      }
    }
    return of(null);
  }

  private getFiltersHandler(dto: TableFilterDto): Observable<IEventResponse> {
    return this.getFiltersByUserId(dto).pipe(
      catchError((error: any) => {
        return of({});
      }),
      map((personalList: any | null) => personalList ?? {}),
      map((personalList: any) => {
        const entity = new ActionTableFiltersEntity(
          dto.tableName,
          dto.action,
          tableFilters[dto.tableName],
          personalList,
        );
        return entity.success().result;
      }),
    );
  }

  private setFiltersHandler(dto: TableFilterDto): Observable<IEventResponse> {
    const entity = new ActionTableFiltersEntity(
      dto.tableName,
      dto.action,
      tableFilters[dto.tableName],
    );
    return this.getFiltersByUserId(dto).pipe(
      concatMap((filters: any) => {
        dto.filters = { ...(filters ?? {}), ...dto.filters };
        return this.setFiltersByUserId(dto);
      }),
      map(() => entity.success().result),
      catchError(() => of(entity.error().result)),
    );
  }

  private tableSortHandler(dto: TableSortDto): Observable<IEventResponse> {
    switch (dto.action) {
      case MessageActionEnum.Get: {
        return this.getSortHandler(dto);
      }
      case MessageActionEnum.Set: {
        return this.setSortHandler(dto);
      }
    }
    return of(null);
  }

  private getSortHandler(dto: TableSortDto): Observable<IEventResponse> {
    return this.getSortByUserId(dto).pipe(
      catchError((error: any) => {
        return of({});
      }),
      map((sortValue: any | null) => sortValue ?? {}),
      map((sortValue: any) => {
        const entity = new ActionTableSortEntity(
          dto.tableName,
          dto.action,
          sortValue.sortField ?? '',
          sortValue.sortDir ?? SortDirEnum.Asc,
        );
        return entity.success().result;
      }),
    );
  }
  private setSortHandler(dto: TableSortDto): Observable<IEventResponse> {
    const entity = new ActionTableSortEntity(
      dto.tableName,
      dto.action,
      dto.sortField,
      dto.sortDir,
    );
    return this.setSortByUserId(dto).pipe(
      map(() => entity.success().result),
      catchError(() => of(entity.error().result)),
    );
  }
}
