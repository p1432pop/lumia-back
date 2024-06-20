import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { GameDTO } from 'src/game/dto/game.dto';

export enum ViewStatus {
  NEW = 'NEW',
  OLD = 'OLD',
}

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

  @ApiProperty({ description: 'paging parameter from previous response', type: 'integer', required: false })
  @Expose()
  next?: number;
}

export class PlayerData extends PlayerPastDTO {
  @ApiProperty({ description: '유저의 닉네임', type: 'string' })
  @Expose()
  nickname: string;

  @ApiProperty({ description: '갱신 가능 여부', type: 'enum', enum: ViewStatus })
  @Expose()
  view: ViewStatus;

  @ApiProperty({ description: '유저의 고유 번호', type: 'integer' })
  @Expose()
  userNum: number;

  @ApiProperty({ description: '유저의 계정 레벨', type: 'integer', required: false })
  @Expose()
  accountLevel?: number;

  @ApiProperty({ description: '최근 사용한 캐릭터 번호', type: 'integer', required: false })
  @Expose()
  characterCode?: number;

  @ApiProperty({ description: '유저의 MMR', type: 'integer', required: false })
  @Expose()
  mmr?: number;

  @ApiProperty({ description: '갱신 시간', type: Date, required: false })
  @Expose()
  updated?: Date;

  @ApiProperty({ description: '랭킹 등수', type: 'integer', required: false })
  @Expose()
  rank?: number;
}

export class PlayerDTO {
  @ApiProperty({ description: '유저 데이터', type: PlayerData })
  @Type(() => PlayerData)
  @Expose()
  playerData: PlayerData;

  @ApiProperty({ description: '유저 통계', type: CharacterStats, isArray: true })
  @Type(() => CharacterStats)
  @Expose()
  playerStats: CharacterStats[];
}
