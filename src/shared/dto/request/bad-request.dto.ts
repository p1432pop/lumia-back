import { ApiProperty } from '@nestjs/swagger';

export class BadRequestDTO {
  @ApiProperty({ description: '메세지' })
  message: string;

  @ApiProperty({ description: '오류' })
  error: string;

  @ApiProperty({ description: '상태코드' })
  statusCode: number;
}
