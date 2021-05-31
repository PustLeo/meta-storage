import { TableColumnEntity } from '../../core/entities/table-column.entity';

export const patientServices = {
  date: new TableColumnEntity({
    title: 'Дата оказания',
    isSortable: true,
    flexFactor: 1,
    view: true,
    position: 0,
    sortKey: 'date',
  }),
  user: new TableColumnEntity({
    title: 'Добавил',
    isSortable: true,
    flexFactor: 1,
    view: true,
    position: 1,
    sortKey: 'user',
  }),
  service: new TableColumnEntity({
    title: 'Название',
    isSortable: true,
    flexFactor: 1,
    view: true,
    position: 2,
    sortKey: 'service',
  }),
  total: new TableColumnEntity({
    title: 'Кол-во',
    isSortable: true,
    flexFactor: 0.5,
    view: true,
    position: 3,
    sortKey: 'total',
  }),
  refTypeName: new TableColumnEntity({
    title: 'Тип услуги',
    isSortable: true,
    flexFactor: 1,
    view: true,
    position: 4,
    sortKey: 'refTypeName',
  }),
  protocolName: new TableColumnEntity({
    title: 'Название протокола',
    isSortable: true,
    flexFactor: 1,
    view: true,
    position: 4,
    sortKey: 'protocolName',
  }),
};
