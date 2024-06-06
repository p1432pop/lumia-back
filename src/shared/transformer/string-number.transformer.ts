import { ValueTransformer } from 'typeorm';

export class ColumnNumericTransformer implements ValueTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

export class ColumnObjectTransformer implements ValueTransformer {
  to(data: object): string {
    return JSON.stringify(data);
  }
  from(data: string): object {
    return JSON.parse(data);
  }
}

export class ColumnArrayTransformer implements ValueTransformer {
  to(data: number[]): string {
    return JSON.stringify(data);
  }
  from(data: string): number[] {
    return JSON.parse(data);
  }
}
