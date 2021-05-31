import { DateTableFilterEntity } from '../../core/entities/table-filters/date.table-filter.entity';
import { SearchTableFilterEntity } from '../../core/entities/table-filters/search.table-filter.entity';
import { IntegerTableFilterEntity } from '../../core/entities/table-filters/integer.table-filter.entity';

export const hospitalizations = {
  dateBegin: new DateTableFilterEntity(),
  dateEnd: new DateTableFilterEntity(),
  numberHistory: new SearchTableFilterEntity(),
  patient: new SearchTableFilterEntity(),
  ambulatoryCardId: new SearchTableFilterEntity(),
  diagnosis: new SearchTableFilterEntity(),
  birthday: new DateTableFilterEntity(),
  bedDays: new IntegerTableFilterEntity(),
};
