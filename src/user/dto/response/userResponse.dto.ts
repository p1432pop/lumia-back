import { ApiProperty } from '@nestjs/swagger';
import { Type, Expose } from 'class-transformer';
import { UserDTO } from './user.dto';

export class UserResponseDTO {
  @ApiProperty({ example: '200', description: '상태코드', type: 'integer' })
  @Expose()
  code: number;

  @ApiProperty({ description: '유저 데이터', type: UserDTO, required: false })
  @Type(() => UserDTO)
  @Expose()
  user?: UserDTO;
}
