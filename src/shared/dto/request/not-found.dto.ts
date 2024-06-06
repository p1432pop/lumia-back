import { ApiProperty } from '@nestjs/swagger';

export class NotFoundDTO {
  @ApiProperty({ description: '메세지' })
  message: string;

  @ApiProperty({ description: '상태코드' })
  statusCode: number;
}
