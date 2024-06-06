import { CallHandler, ExecutionContext, NestInterceptor, Type } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

export class SerializeInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private readonly classType: Type<T>) {}
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.classType, data);
      }),
    );
  }
}
