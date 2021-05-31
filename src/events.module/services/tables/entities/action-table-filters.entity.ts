import { ResponseEntity } from '../../../../core/entities/response.entity';
import { EventCodesEnum } from '../../../enums/event-codes.enum';
import { TableNamesEnum } from '../../../enums/table-names.enum';
import { MessageActionEnum } from '../../../enums/message-action.enum';
import { IEventResponse } from '../../../interfaces/event-response.interface';
import { TableFilterEntity } from '../../../../core/entities/table-filter.entity';
import { ResponseMessageEnum } from '../../../../core/entities/response-message.enum';

export class ActionTableFiltersEntity extends ResponseEntity<
  TableFilterEntity<any>,
  TableFilterEntity<any>
> {
  protected readonly event: EventCodesEnum = EventCodesEnum.TableFilter;

  constructor(
    protected tableName: TableNamesEnum,
    protected action: MessageActionEnum,
    protected defaultList: { [key: string]: TableFilterEntity<any> },
    protected personalList: { [key: string]: TableFilterEntity<any> } = {},
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
        filters: this.getFilters,
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

  private get getFilters(): { [key: string]: TableFilterEntity<any> } {
    return { ...this.defaultList, ...this.personalList };
  }
}
