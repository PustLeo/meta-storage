import { TableFilterEntity } from '../table-filter.entity';
import { TableFilterTypeEntity } from '../table-filter-type.entity';
import { TableFilterTypeEnum } from '../../enums/table-filter-type.enum';
import { TableFilterSubtypeEnum } from '../../enums/table-filter-subtype.enum';

export class SearchTableFilterEntity extends TableFilterEntity<string> {
  constructor(defaultValue: string = '') {
    super({
      type: new TableFilterTypeEntity({
        type: TableFilterTypeEnum.String,
        subType: TableFilterSubtypeEnum.Search,
      }),
      value: defaultValue,
      operatorIsExist: false,
    });
  }
}
