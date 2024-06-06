import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class NewsDTO {
  @ApiProperty({ description: 'News URL', type: 'string' })
  @Expose()
  url: string;

  @ApiProperty({ description: 'News Title', type: 'string' })
  @Expose()
  title: string;
}
