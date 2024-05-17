import { Column, ColumnOptions } from 'typeorm';
import { ColumnNumericTransformer } from '../transformer/string-number.transformer';

export function NumericColumn(options?: ColumnOptions): PropertyDecorator {
  return Column({
    type: 'numeric',
    precision: 5,
    scale: 4,
    transformer: new ColumnNumericTransformer(),
    ...options,
  });
}
