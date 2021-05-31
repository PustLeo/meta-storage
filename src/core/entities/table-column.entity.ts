export class TableColumnEntity {
  title: string;
  isSortable: boolean;
  flexFactor: number;
  view: boolean;
  position: number;
  sortKey: string;

  constructor(data: Partial<TableColumnEntity>);
  constructor(
    title: string,
    isSortable: boolean,
    flexFactor: number,
    view: boolean,
    position: number,
  );
  constructor(...data) {
    if (typeof data[0] === 'object') {
      Object.assign(this, data[0]);
    } else {
      const [title, isSortable, flexFactor, view, position] = data;
      Object.assign(this, { title, isSortable, flexFactor, view, position });
    }
  }
}
