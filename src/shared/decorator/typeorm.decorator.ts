import { Column, ColumnOptions } from 'typeorm';
import { ColumnArrayTransformer, ColumnNumericTransformer, ColumnObjectTransformer } from '../transformer/string-number.transformer';

export function NumericColumn(options?: ColumnOptions): PropertyDecorator {
  return Column({
    type: 'numeric',
    precision: 5,
    scale: 4,
    transformer: new ColumnNumericTransformer(),
    ...options,
  });
}

export function ArrayColumn(options?: ColumnOptions): PropertyDecorator {
  return Column({
    type: 'varchar',
    length: 30,
    transformer: new ColumnArrayTransformer(),
    ...options,
  });
}

export function ObjectColumn(options?: ColumnOptions): PropertyDecorator {
  return Column({
    type: 'varchar',
    transformer: new ColumnObjectTransformer(),
    ...options,
  });
}
