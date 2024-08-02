import { ValueTransformer } from 'typeorm';

export class ParseFloatTransformer implements ValueTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

export class ParseIntTransformer implements ValueTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseInt(data);
  }
}

export class ParseObjectTransformer implements ValueTransformer {
  to(data: object): string {
    return JSON.stringify(data);
  }
  from(data: string): object {
    return JSON.parse(data);
  }
}

export class ParseArrayTransformer implements ValueTransformer {
  to(data: number[]): string {
    return JSON.stringify(data);
  }
  from(data: string): number[] {
    return JSON.parse(data);
  }
}
