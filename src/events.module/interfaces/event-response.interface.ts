import { WsResponse } from '@nestjs/websockets';
import { EventCodesEnum } from '../enums/event-codes.enum';
import { MessageActionEnum } from '../enums/message-action.enum';

/**
 * Интерфейс ответа при выполнении действия
 */
export interface IEventResponse extends WsResponse {
  /** Код действия */
  event: EventCodesEnum;
  /** Код ответа */
  code?: number;
  /** Статус ответа */
  status?: any;
  action?: MessageActionEnum;
  clientData?: { [key: string]: any };
}
