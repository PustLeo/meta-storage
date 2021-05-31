import { RequestTableDto } from '../../core/dto/request-table.dto';
import { TableFilterEntity } from '../../core/entities/table-filter.entity';

export class TableFilterDto extends RequestTableDto {
  filters: { [key: string]: TableFilterEntity<any> };

  constructor(data: TableFilterDto) {
    super();
    if ('filters' in data) {
      this.filters = {};
      Object.entries(data.filters).forEach(
        ([key, val]) => (this.filters[key] = new TableFilterEntity<any>(val)),
      );
    }
    const { filters, ...fields } = data;
    Object.assign(this, fields);
  }
}
