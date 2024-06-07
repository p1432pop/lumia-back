import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class NewsDTO {
  @ApiProperty({ description: '패치노트 URL', type: 'string' })
  @Expose()
  url: string;

  @ApiProperty({ description: '패치노트 제목', type: 'string' })
  @Expose()
  title: string;
}
