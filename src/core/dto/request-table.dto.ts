import { MessageActionEnum } from '../../events.module/enums/message-action.enum';
import { TableNamesEnum } from '../../events.module/enums/table-names.enum';

export abstract class RequestTableDto {
  /** Код действия */
  action: MessageActionEnum;
  /** Код таблицы */
  tableName: TableNamesEnum;
  /** Идентификатор пользователя */
  userId: number;
}
