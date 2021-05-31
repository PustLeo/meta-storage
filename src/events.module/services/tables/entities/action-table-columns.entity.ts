import { EventCodesEnum } from '../../../enums/event-codes.enum';
import { TableNamesEnum } from '../../../enums/table-names.enum';
import { IEventResponse } from '../../../interfaces/event-response.interface';
import { ResponseEntity } from '../../../../core/entities/response.entity';
import { MessageActionEnum } from '../../../enums/message-action.enum';
import { TableColumnEntity } from '../../../../core/entities/table-column.entity';
import { ResponseMessageEnum } from '../../../../core/entities/response-message.enum';

/**
 * Класс ответа по завершению события,
 * связанного с работой над колонками таблицы
 */
export class ActionTableColumnsEntity extends ResponseEntity<
  TableColumnEntity,
  TableColumnEntity
> {
  /** Код события */
  protected readonly event: EventCodesEnum = EventCodesEnum.TableColumn;

  constructor(
    tableName: TableNamesEnum,
    action: MessageActionEnum,
    defaultList: { [key: string]: TableColumnEntity },
  );
  constructor(
    tableName: TableNamesEnum,
    action: MessageActionEnum,
    defaultList: { [key: string]: TableColumnEntity },
    personalList: { [key: string]: TableColumnEntity },
  );
  /**
   * Конструктор
   * @param {TableNamesEnum} tableName
   * @param {MessageActionEnum} action
   * @param defaultList
   * @param personalList
   */
  constructor(
    tableName: TableNamesEnum,
    action: MessageActionEnum,
    defaultList: { [key: string]: TableColumnEntity },
    personalList: { [key: string]: TableColumnEntity } = {},
  ) {
    super();
    this.tableName = tableName;
    this.action = action;
    this.defaultList = defaultList;
    this.personalList = personalList;
  }

  /**
   * Результат, отдаваемый клиенту
   * @returns {IEventResponse}
   */
  get result(): IEventResponse {
    switch (this.action) {
      case MessageActionEnum.Get: {
        return this.resultByGetAction;
      }
      case MessageActionEnum.Set: {
        return this.resultBySetAction;
      }
    }
    return this.defaultResult;
  }

  /**
   * Подготовка колонок таблицы
   * @returns {any}
   * @private
   */
  private get getColumns(): any {
    return { ...this.defaultList, ...this.personalList };
  }

  private get resultByGetAction(): IEventResponse {
    return {
      ...this.defaultResult,
      data: {
        tableName: this.tableName,
        columns: this.getColumns,
      },
    };
  }

  private get resultBySetAction(): IEventResponse {
    return {
      ...this.defaultResult,
      data: {
        message: ResponseMessageEnum.DataSaved,
      },
    };
  }
}
