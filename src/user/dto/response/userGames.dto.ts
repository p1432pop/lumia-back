import { ApiProperty } from '@nestjs/swagger';
import { Type, Expose } from 'class-transformer';
import { GameDTO } from 'src/game/dto/game.dto';

export class UserGamesDTO {
  @ApiProperty({ description: '게임 데이터', type: GameDTO, isArray: true })
  @Type(() => GameDTO)
  @Expose()
  games: GameDTO[];

  @ApiProperty({ description: 'paging parameter', type: 'integer', required: false })
  @Expose()
  next?: number;
}
