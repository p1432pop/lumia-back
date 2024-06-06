import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { GameDTO } from 'src/game/dto/game.dto';

export class CharacterStats {
  @ApiProperty({ type: 'number' })
  @Expose()
  characterCode: number;

  @ApiProperty({ type: 'number' })
  @Expose()
  totalGames: number;

  @Expose()
  wins: number;

  @Expose()
  top3: number;

  @Expose()
  averageKills: number;

  @Expose()
  averageTeamKills: number;

  @Expose()
  averageAssistants: number;

  @Expose()
  averageHunts: number;

  @Expose()
  averageRank: number;

  @Expose()
  averageGainVFCredit: number;
}

export class PlayerPastDTO {
  @ApiProperty({ type: GameDTO, isArray: true })
  @Type(() => GameDTO)
  @Expose()
  games: GameDTO[];

  @ApiProperty({ type: 'number' })
  @Expose()
  next?: number;
}

export class PlayerData extends PlayerPastDTO {
  @ApiProperty({ type: 'string' })
  @Expose()
  nickname: string;

  @Expose()
  view: ViewStatus;

  @Expose()
  userNum: number;

  @Expose()
  accountLevel?: number;

  @Expose()
  characterCode?: number;

  @Expose()
  mmr?: number;

  @Expose()
  updated?: Date;

  @Expose()
  rank?: number;
}

export class PlayerDTO {
  @ApiProperty({ type: PlayerData })
  @Type(() => PlayerData)
  @Expose()
  playerData: PlayerData;

  @ApiProperty({ type: CharacterStats, isArray: true })
  @Type(() => CharacterStats)
  @Expose()
  playerStats: CharacterStats[];
}

export enum ViewStatus {
  NEW = 'NEW',
  OLD = 'OLD',
}
