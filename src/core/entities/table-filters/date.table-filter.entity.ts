import { TableFilterEntity } from '../table-filter.entity';
import { TableFilterTypeEnum } from '../../enums/table-filter-type.enum';
import { TableFilterSubtypeEnum } from '../../enums/table-filter-subtype.enum';
import { TableFilterTypeEntity } from '../table-filter-type.entity';
import { FilterOperatorsEnum } from '../../enums/filter-operators.enum';

export class DateTableFilterEntity extends TableFilterEntity<string> {
  constructor(defaultValue: string = '') {
    super({
      type: new TableFilterTypeEntity({
        type: TableFilterTypeEnum.String,
        subType: TableFilterSubtypeEnum.Date,
      }),
      value: defaultValue,
      operatorIsExist: true,
      operator: FilterOperatorsEnum.Equally,
    });
  }
}
