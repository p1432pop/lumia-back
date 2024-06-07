import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { GameDTO } from 'src/game/dto/game.dto';

export class CharacterStats {
  @ApiProperty({ description: '실험체의 번호', type: 'integer' })
  @Expose()
  characterCode: number;

  @ApiProperty({ description: '플레이한 게임 수', type: 'integer' })
  @Expose()
  totalGames: number;

  @ApiProperty({ description: '승리한 게임 수', type: 'integer' })
  @Expose()
  wins: number;

  @ApiProperty({ description: '3등 이내 게임 수', type: 'integer' })
  @Expose()
  top3: number;

  @ApiProperty({ example: 0, description: '평균 킬 수', type: 'float' })
  @Expose()
  averageKills: number;

  @ApiProperty({ example: 0, description: '평균 팀에서 기록한 킬', type: 'float' })
  @Expose()
  averageTeamKills: number;

  @ApiProperty({ example: 0, description: '평균 어시스트 수', type: 'float' })
  @Expose()
  averageAssistants: number;

  @ApiProperty({ example: 0, description: '평균 사냥 수', type: 'float' })
  @Expose()
  averageHunts: number;

  @ApiProperty({ example: 0, description: '평균 등수', type: 'float' })
  @Expose()
  averageRank: number;

  @ApiProperty({ description: '평균 획득한 크레딧 량', type: 'integer' })
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

  @ApiProperty({ description: '갱신 시간', type: Date })
  @Expose()
  updated?: Date;

  @ApiProperty({description: })
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
