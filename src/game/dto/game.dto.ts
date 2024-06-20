import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class Equipment {
  @ApiProperty({
    description: '무기 슬롯의 아이템 코드',
    type: 'integer',
    required: false,
  })
  @Expose()
  '0'?: number;

  @ApiProperty({
    description: '옷 슬롯의 아이템 코드',
    type: 'integer',
    required: false,
  })
  @Expose()
  '1'?: number;

  @ApiProperty({
    description: '머리 슬롯의 아이템 코드',
    type: 'integer',
    required: false,
  })
  @Expose()
  '2'?: number;

  @ApiProperty({
    description: '팔 슬롯의 아이템 코드',
    type: 'integer',
    required: false,
  })
  @Expose()
  '3'?: number;

  @ApiProperty({
    description: '다리 슬롯의 아이템 코드',
    type: 'integer',
    required: false,
  })
  @Expose()
  '4'?: number;
}

export class GameDTO {
  @ApiProperty({
    description: '유저의 고유 번호',
    type: 'integer',
  })
  @Expose()
  userNum: number;

  @ApiProperty({
    description: '게임의 고유 번호',
    type: 'integer',
  })
  @Expose()
  gameId: number;

  @ApiProperty({
    description: '시즌 ID',
    type: 'integer',
  })
  @Expose()
  seasonId: number;

  @ApiProperty({
    description: '메인 수정 버전',
    type: 'integer',
  })
  @Expose()
  versionMajor: number;

  @ApiProperty({
    description: '마이너 수정 버전',
    type: 'integer',
  })
  @Expose()
  versionMinor: number;

  @ApiProperty({
    description: '실험체의 번호',
    type: 'integer',
  })
  @Expose()
  characterNum: number;

  @ApiProperty({
    description: '사망/승리 시점의 캐릭터 레벨',
    type: 'integer',
  })
  @Expose()
  characterLevel: number;

  @ApiProperty({
    description: '유저의 최종 등수',
    type: 'integer',
  })
  @Expose()
  gameRank: number;

  @ApiProperty({
    description: '게임 진행 중 유저의 킬 수',
    type: 'integer',
  })
  @Expose()
  playerKill: number;

  @ApiProperty({
    description: '게임 진행 중 유저의 어시스트 수',
    type: 'integer',
  })
  @Expose()
  playerAssistant: number;

  @ApiProperty({
    description: '게임 진행 중 유저의 사냥 수',
    type: 'integer',
  })
  @Expose()
  monsterKill: number;

  @ApiProperty({
    description: '부위별 장착 아이템',
    type: Equipment,
  })
  //nested response를 위한 type 선언
  @Type(() => Equipment)
  @Expose()
  equipment: Equipment;

  @ApiProperty({
    description: '서버의 게임 시작 시간',
    type: Date,
  })
  @Expose()
  startDtm: string;

  @ApiProperty({
    description: '서버의 프레임 타임',
    type: 'integer',
  })
  @Expose()
  duration: number;

  @ApiProperty({
    description: '유저의 기존 MMR',
    type: 'integer',
  })
  @Expose()
  mmrBefore: number;

  @ApiProperty({
    description: '유저의 MMR 변동량',
    type: 'integer',
  })
  @Expose()
  mmrGain: number;

  @ApiProperty({
    description: '유저의 신규 MMR',
    type: 'integer',
  })
  @Expose()
  mmrAfter: number;

  @ApiProperty({
    description: '승리 여부',
    type: 'integer',
  })
  @Expose()
  victory: number;

  @ApiProperty({
    description: '다른 생존자에게 준 총 피해량',
    type: 'integer',
  })
  @Expose()
  damageToPlayer: number;

  @ApiProperty({
    description: '게임 포기 여부',
    type: 'integer',
  })
  @Expose()
  giveUp: number;

  @ApiProperty({
    description: '게임에 참여한 총 유저 수',
    type: 'integer',
  })
  @Expose()
  matchSize: number;

  @ApiProperty({
    description: '팀에서 기록한 킬',
    type: 'integer',
  })
  @Expose()
  teamKill: number;

  @ApiProperty({
    description: '유저의 계정 레벨',
    type: 'integer',
  })
  @Expose()
  accountLevel: number;

  @ApiProperty({
    description: '주 특성의 핵심 슬롯 번호',
    type: 'integer',
  })
  @Expose()
  traitFirstCore: number;

  @ApiProperty({
    description: '주 특성의 보조 슬롯 번호 배열',
    type: 'integer',
    isArray: true,
  })
  @Expose()
  traitFirstSub: number[];

  @ApiProperty({
    description: '보조 특성의 보조 슬롯 번호 배열',
    type: 'integer',
    isArray: true,
  })
  @Expose()
  traitSecondSub: number[];

  @ApiProperty({
    description: '1. 전투 외 이유로 탈출 실패\n2. 적 유저에게 사망\n3. 탈출 성공',
    type: 'integer',
  })
  @Expose()
  escapeState: number;

  @ApiProperty({
    description: '최종 전술 스킬의 종류',
    type: 'integer',
  })
  @Expose()
  tacticalSkillGroup: number;

  @ApiProperty({
    description: '최종 전술 스킬의 레벨',
    type: 'integer',
  })
  @Expose()
  tacticalSkillLevel: number;

  @ApiProperty({
    description: '총 획득한 크레딧 량',
    type: 'integer',
  })
  @Expose()
  totalGainVFCredit: number;
}
