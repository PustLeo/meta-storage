import { RequestTableDto } from '../../core/dto/request-table.dto';
import { SortDirEnum } from '../../core/enums/sort-dir.enum';

export class TableSortDto extends RequestTableDto {
  sortField: string;
  sortDir: SortDirEnum;

  constructor(data: Partial<Exclude<TableSortDto, 'sortValue'>>) {
    super();
    Object.assign(this, data);
  }

  public get sortValue(): any {
    return {
      sortField: this.sortField,
      sortDir: this.sortDir,
    };
  }
}
