export class TableFilterTypeEntity {
  type: string;
  subType: string;

  constructor(data: Partial<TableFilterTypeEntity>) {
    Object.assign(this, data);
  }
}
