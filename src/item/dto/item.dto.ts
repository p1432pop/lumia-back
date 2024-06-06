import { Expose } from 'class-transformer';
import { ConsumableType, ItemGrade, ItemType, WeaponType, ArmorType } from '../item-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export abstract class CommonDTO {
  @ApiProperty({
    description: 'Item Code',
    type: 'number',
  })
  @Expose()
  code: number;

  @ApiProperty({
    description: 'Item Name',
    type: 'string',
  })
  @Expose()
  name: string;

  @Expose()
  itemType: ItemType;

  @Expose()
  itemGrade: ItemGrade;
}

export class ItemConsumableDTO extends CommonDTO {
  @Expose()
  consumableType: ConsumableType;

  @Expose()
  hpRecover: number;

  @Expose()
  spRecover: number;
}

export class ItemWearableDTO extends CommonDTO {
  @Expose()
  wearableType: WeaponType | ArmorType;

  @Expose()
  attackPower: number;

  @Expose()
  attackPowerByLv: number;

  @Expose()
  defense: number;

  @Expose()
  defenseByLv: number;

  @Expose()
  skillAmp: number;

  @Expose()
  skillAmpByLevel: number;

  @Expose()
  adaptiveForce: number;

  @Expose()
  maxHp: number;

  @Expose()
  maxHpByLv: number;

  @Expose()
  maxSp: number;

  @Expose()
  hpRegenRatio: number;

  @Expose()
  spRegenRatio: number;

  @Expose()
  spRegen: number;

  @Expose()
  attackSpeedRatio: number;

  @Expose()
  attackSpeedRatioByLv: number;

  @Expose()
  criticalStrikeChance: number;

  @Expose()
  criticalStrikeDamage: number;

  @Expose()
  cooldownReduction: number;

  @Expose()
  lifeSteal: number;

  @Expose()
  normalLifeSteal: number;

  @Expose()
  moveSpeed: number;

  @Expose()
  sightRange: number;

  @Expose()
  preventBasicAttackDamagedRatio: number;

  @Expose()
  increaseBasicAttackDamageRatioByLv: number;

  @Expose()
  preventSkillDamagedRatio: number;

  @Expose()
  penetrationDefense: number;

  @Expose()
  penetrationDefenseRatio: number;

  @Expose()
  healerGiveHpHealRatio: number;

  @Expose()
  uniqueAttackRange: number;

  @Expose()
  uniqueCooldownLimit: number;

  @Expose()
  uniqueTenacity: number;

  @Expose()
  uniqueMoveSpeed: number;

  @Expose()
  uniqueSkillAmpRatio: number;
}
