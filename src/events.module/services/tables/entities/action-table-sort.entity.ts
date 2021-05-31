import { ResponseEntity } from '../../../../core/entities/response.entity';
import { EventCodesEnum } from '../../../enums/event-codes.enum';
import { IEventResponse } from '../../../interfaces/event-response.interface';
import { MessageActionEnum } from '../../../enums/message-action.enum';
import { TableNamesEnum } from '../../../enums/table-names.enum';
import { SortDirEnum } from '../../../../core/enums/sort-dir.enum';
import { ResponseMessageEnum } from '../../../../core/entities/response-message.enum';

export class ActionTableSortEntity extends ResponseEntity<{}, {}> {
  protected readonly event: EventCodesEnum = EventCodesEnum.TableSort;

  constructor(
    protected tableName: TableNamesEnum,
    protected action: MessageActionEnum,
    private sortField: string,
    private sortDir: SortDirEnum,
  ) {
    super();
  }

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

  private get resultByGetAction(): IEventResponse {
    return {
      ...this.defaultResult,
      data: {
        tableName: this.tableName,
        sortField: this.sortField,
        sortDir: this.sortDir,
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
