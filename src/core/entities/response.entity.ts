import { EventResponseStatusesEnum } from '../../events.module/enums/event-response-statuses.enum';
import { EventResponseCodesEnum } from '../../events.module/enums/event-response-codes.enum';
import { EventCodesEnum } from '../../events.module/enums/event-codes.enum';
import { IEventResponse } from '../../events.module/interfaces/event-response.interface';
import { MessageActionEnum } from '../../events.module/enums/message-action.enum';
import { TableNamesEnum } from '../../events.module/enums/table-names.enum';
import { TableColumnEntity } from './table-column.entity';

/**
 * Класс ответа по завершению события
 */
export abstract class ResponseEntity<DL = {}, PL = {}> {
  /** Код события */
  protected abstract event: EventCodesEnum;
  /** Формирования ответа */
  public abstract get result(): IEventResponse;
  protected action: MessageActionEnum;
  protected tableName: TableNamesEnum;
  protected defaultList: { [key: string]: DL };
  protected personalList: { [key: string]: PL };
  /** Статус выполнения */
  protected status: EventResponseStatusesEnum;
  /** Код выполнения */
  protected code: EventResponseCodesEnum;
  /** Сообщение */
  protected message?: string;
  protected clientData?: { [key: string]: any };

  /**
   * Подготовка положительного ответа
   * @returns {ResponseEntity}
   */
  public success(): ResponseEntity {
    this.status = EventResponseStatusesEnum.Done;
    this.code = EventResponseCodesEnum.Success;
    return this;
  }

  /**
   * Подготовка ответа с ошибкой
   * @returns {ResponseEntity}
   */
  public error(): ResponseEntity {
    this.status = EventResponseStatusesEnum.Done;
    this.code = EventResponseCodesEnum.BadRequest;
    return this;
  }

  protected get defaultResult(): IEventResponse {
    const result: IEventResponse = {
      event: this.event,
      data: {},
      code: this.code,
      status: this.status,
      action: this.action,
    };
    if (this.clientData) {
      result.clientData = this.clientData;
    }
    return result;
  }
}
