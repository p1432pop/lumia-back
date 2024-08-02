import { Expose } from 'class-transformer';
import { ConsumableType, ItemGrade, ItemType, WeaponType, ArmorType, WearableType } from '../item-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export abstract class CommonDTO {
  @ApiProperty({ description: '아이템 고유 번호', type: 'integer' })
  @Expose()
  code: number;

  @ApiProperty({ description: '아이템 이름', type: 'string' })
  @Expose()
  name: string;

  @ApiProperty({ description: '아이템 종류', type: 'enum', enum: ItemType })
  @Expose()
  itemType: ItemType;

  @ApiProperty({ description: '아이템 등급', type: 'enum', enum: ItemGrade })
  @Expose()
  itemGrade: ItemGrade;
}

export class ItemConsumableDTO extends CommonDTO {
  @ApiProperty({ description: '소모품 종류', type: 'enum', enum: ConsumableType })
  @Expose()
  consumableType: ConsumableType;

  @ApiProperty({ description: '체력 회복량', type: 'integer' })
  @Expose()
  hpRecover: number;

  @ApiProperty({ description: '스태미나 회복량', type: 'integer' })
  @Expose()
  spRecover: number;
}

export class ItemWearableDTO extends CommonDTO {
  @ApiProperty({ description: '장비 아이템 종류', type: 'enum', enum: WearableType })
  @Expose()
  wearableType: WeaponType | ArmorType;

  @ApiProperty({ description: '공격력', type: 'integer' })
  @Expose()
  attackPower: number;

  @ApiProperty({ description: '레벨 당 공격력', type: 'integer' })
  @Expose()
  attackPowerByLv: number;

  @ApiProperty({ description: '방어력', type: 'integer' })
  @Expose()
  defense: number;

  @ApiProperty({ description: '레벨 당 방어력', type: 'integer' })
  @Expose()
  defenseByLv: number;

  @ApiProperty({ description: '스킬 증폭', type: 'integer' })
  @Expose()
  skillAmp: number;

  @ApiProperty({ description: '레벨 당 스킬 증폭', type: 'integer' })
  @Expose()
  skillAmpByLevel: number;

  @ApiProperty({ description: '적응형 능력치', type: 'integer' })
  @Expose()
  adaptiveForce: number;

  @ApiProperty({ description: '최대 체력', type: 'integer' })
  @Expose()
  maxHp: number;

  @ApiProperty({ description: '레벨 당 최대 체력', type: 'integer' })
  @Expose()
  maxHpByLv: number;

  @ApiProperty({ description: '최대 스태미나', type: 'integer' })
  @Expose()
  maxSp: number;

  @ApiProperty({ example: 0, description: '체력 재생', type: 'float' })
  @Expose()
  hpRegenRatio: number;

  @ApiProperty({ example: 0, description: '스태미나 재생', type: 'float' })
  @Expose()
  spRegenRatio: number;

  @ApiProperty({ description: '스태미나 재생', type: 'integer' })
  @Expose()
  spRegen: number;

  @ApiProperty({ example: 0, description: '공격 속도', type: 'float' })
  @Expose()
  attackSpeedRatio: number;

  @ApiProperty({ example: 0, description: '레벨 당 공격 속도', type: 'float' })
  @Expose()
  attackSpeedRatioByLv: number;

  @ApiProperty({ example: 0, description: '치명타 확률', type: 'float' })
  @Expose()
  criticalStrikeChance: number;

  @ApiProperty({ example: 0, description: '치명타 피해량', type: 'float' })
  @Expose()
  criticalStrikeDamage: number;

  @ApiProperty({ example: 0, description: '쿨다운 감소', type: 'float' })
  @Expose()
  cooldownReduction: number;

  @ApiProperty({ example: 0, description: '모든 피해 흡혈', type: 'float' })
  @Expose()
  lifeSteal: number;

  @ApiProperty({ example: 0, description: '생명력 흡수', type: 'float' })
  @Expose()
  normalLifeSteal: number;

  @ApiProperty({ example: 0, description: '이동 속도', type: 'float' })
  @Expose()
  moveSpeed: number;

  @ApiProperty({ example: 0, description: '시야', type: 'float' })
  @Expose()
  sightRange: number;

  @ApiProperty({ description: '기본 공격 피해 감소', type: 'integer' })
  @Expose()
  preventBasicAttackDamagedRatio: number;

  @ApiProperty({ example: 0, description: '레벨 당 기본 공격 증폭', type: 'float' })
  @Expose()
  increaseBasicAttackDamageRatioByLv: number;

  @ApiProperty({ example: 0, description: '스킬 피해 감소', type: 'float' })
  @Expose()
  preventSkillDamagedRatio: number;

  @ApiProperty({ description: '방어 관통', type: 'integer' })
  @Expose()
  penetrationDefense: number;

  @ApiProperty({ example: 0, description: '방어 관통', type: 'float' })
  @Expose()
  penetrationDefenseRatio: number;

  @ApiProperty({ example: 0, description: '주는 회복 증가', type: 'float' })
  @Expose()
  healerGiveHpHealRatio: number;

  @ApiProperty({ example: 0, description: '고유 기본 공격 사거리', type: 'float' })
  @Expose()
  uniqueAttackRange: number;

  @ApiProperty({ example: 0, description: '고유 최대 쿨다운 감소', type: 'float' })
  @Expose()
  uniqueCooldownLimit: number;

  @ApiProperty({ example: 0, description: '고유 방해 효과 저항', type: 'float' })
  @Expose()
  uniqueTenacity: number;

  @ApiProperty({ example: 0, description: '고유 이동 속도', type: 'float' })
  @Expose()
  uniqueMoveSpeed: number;

  @ApiProperty({ example: 0, description: '고유 스킬 증폭', type: 'float' })
  @Expose()
  uniqueSkillAmpRatio: number;
}
