import { FilterOperatorsEnum } from '../enums/filter-operators.enum';
import { TableFilterTypeEntity } from './table-filter-type.entity';

export class TableFilterEntity<T> {
  value: T;
  operator?: FilterOperatorsEnum;
  type: TableFilterTypeEntity;
  operatorIsExist: boolean = false;

  constructor(data: Partial<TableFilterEntity<T>>) {
    if ('value' in data) {
      this.setValue(data.value);
    }
    const { value, ...fields } = data;
    Object.assign(this, fields);
  }

  private setValue(value: T): void {
    if (value === undefined) {
      return;
    }
    if (value === null || typeof value !== 'object') {
      this.value = value;
      return;
    }
    if (Array.isArray(value)) {
      this.value = value;
      return;
    }
    this.value = { ...value };
  }
}
