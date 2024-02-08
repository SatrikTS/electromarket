/* Mappings */
export enum priorities {
  PRIORITY_LOW = 1,
  PRIORITY_MEDIUM = 2,
  PRIORITY_HIGH = 3,
  PRIORITY_CRITICAL = 4
}

export const priorityNames = {
  [priorities.PRIORITY_LOW]: 'Низкий',
  [priorities.PRIORITY_MEDIUM]: 'Средний',
  [priorities.PRIORITY_HIGH]: 'Высокий',
  [priorities.PRIORITY_CRITICAL]: 'Критичный',
}

export enum units {
  UNIT_KILOGRAMS = 0,
  UNIT_PIECE = 1
}

export const unitNames = {
  [units.UNIT_PIECE]: 'шт',
  [units.UNIT_KILOGRAMS]: 'кг',
}

/* Modal types */
export const DELIVERY_CDEK = 'СДЭК'
export const DELIVERY_POST = 'Почта России'
export const DELIVERY_DELOVIE_LINII = 'Деловые Линии'


export const MAX_PRICE = 1000000000