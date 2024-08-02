import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class VersionStatDTO {
  @ApiProperty({ description: '실험체의 번호', type: 'integer' })
  @Expose()
  characterCode: number;

  @ApiProperty({ description: '무기 타입', type: 'integer' })
  @Expose()
  bestWeapon: number;

  @ApiProperty({ example: 0, description: '평균 mmr 획득량', type: 'float' })
  @Expose()
  mmrGain: number;

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

  @ApiProperty({ description: '평균 가한 피해량', type: 'integer' })
  @Expose()
  averageDamageToPlayer: number;

  @ApiProperty({ description: '평균 받은 피해량', type: 'integer' })
  @Expose()
  averageDamageFromPlayer: number;

  @ApiProperty({ description: '평균 획득한 크레딧 량', type: 'integer' })
  @Expose()
  averageGainVFCredit: number;
}
