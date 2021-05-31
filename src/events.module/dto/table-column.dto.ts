import { MessageActionEnum } from '../enums/message-action.enum';
import { TableNamesEnum } from '../enums/table-names.enum';
import { TableColumnEntity } from '../../core/entities/table-column.entity';
import { RequestTableDto } from '../../core/dto/request-table.dto';
import { tableColumns } from '../../constants/table-columns/main';

/**
 * Класс входных данных при работе с
 * колонками таблиц
 */
export class TableColumnDto extends RequestTableDto {
  columns?: { [key: string]: TableColumnEntity };

  /**
   * Конструктор
   * @param {Partial<TableColumnDto>} data
   */
  constructor(data: Partial<TableColumnDto>) {
    super();
    if ('columns' in data) {
      this.columns = {};
      Object.entries(data.columns).forEach(
        ([key, value]) => (this.columns[key] = new TableColumnEntity(value)),
      );
    }
    const { columns, ...fields } = data;
    Object.assign(this, fields);
  }

  public mergeSavedCol(cols: { [key: string]: TableColumnEntity }): {
    [key: string]: TableColumnEntity;
  } {
    if (!this.columns) {
      return {};
    }
    const defaultCols = tableColumns[this.tableName];
    const deleteKeys: string[] = [];
    Object.entries(this.columns).forEach(([key, val]) =>
      this.toEqual(val, defaultCols[key]) ? deleteKeys.push(key) : null,
    );
    deleteKeys.forEach((key: string) => {
      delete this.columns[key];
      if (key in cols) {
        delete cols[key];
      }
    });
    this.columns = { ...cols, ...this.columns };
    return this.columns;
  }

  private toEqual(col1, col2): boolean {
    return Object.entries(col1).every(([key, val]) => col2[key] === val);
  }
}
