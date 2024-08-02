import { Column, ColumnOptions, ViewColumn } from 'typeorm';
import { ParseArrayTransformer, ParseFloatTransformer, ParseIntTransformer, ParseObjectTransformer } from '../transformer/typeorm.transformer';
import { ViewColumnOptions } from 'typeorm/decorator/options/ViewColumnOptions';

export function NumericColumn(options?: ColumnOptions): PropertyDecorator {
  return Column({
    type: 'numeric',
    transformer: new ParseFloatTransformer(),
    ...options,
  });
}

/**type: varchar */
export function ArrayColumn(options?: ColumnOptions): PropertyDecorator {
  return Column({
    type: 'varchar',
    transformer: new ParseArrayTransformer(),
    ...options,
  });
}

/**type: varchar */
export function ObjectColumn(options?: ColumnOptions): PropertyDecorator {
  return Column({
    type: 'varchar',
    transformer: new ParseObjectTransformer(),
    ...options,
  });
}

export function IntViewColumn(options?: ViewColumnOptions): PropertyDecorator {
  return ViewColumn({
    transformer: new ParseIntTransformer(),
    ...options,
  });
}

export function NumericViewColumn(options?: ViewColumnOptions): PropertyDecorator {
  return ViewColumn({
    transformer: new ParseFloatTransformer(),
    ...options,
  });
}
