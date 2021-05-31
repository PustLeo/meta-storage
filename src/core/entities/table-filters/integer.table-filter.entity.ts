import { TableFilterEntity } from '../table-filter.entity';
import { TableFilterTypeEntity } from '../table-filter-type.entity';
import { TableFilterTypeEnum } from '../../enums/table-filter-type.enum';
import { TableFilterSubtypeEnum } from '../../enums/table-filter-subtype.enum';
import { FilterOperatorsEnum } from '../../enums/filter-operators.enum';

export class IntegerTableFilterEntity extends TableFilterEntity<number> {
  constructor(defaultValue: number = null) {
    super({
      type: new TableFilterTypeEntity({
        type: TableFilterTypeEnum.Number,
        subType: TableFilterSubtypeEnum.Integer,
      }),
      value: defaultValue,
      operatorIsExist: true,
      operator: FilterOperatorsEnum.Equally,
    });
  }
}
