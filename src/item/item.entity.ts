import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ConsumableType, ItemGrade, ItemType, ArmorType, WeaponType, WearableType } from './item-type.enum';
import { NumericColumn } from 'src/shared/decorator/typeorm.decorator';

export abstract class Common {
  @PrimaryColumn({ type: 'integer' })
  code: number;

  @Column({ type: 'varchar', length: 40 })
  name: string;

  @Column({ type: 'enum', enum: ItemType })
  itemType: ItemType;

  @Column({ type: 'enum', enum: ItemGrade })
  itemGrade: ItemGrade;
}

@Entity('item_consumable')
export class ItemConsumable extends Common {
  @Column({ type: 'enum', enum: ConsumableType })
  consumableType: ConsumableType;

  @Column({ type: 'smallint' })
  hpRecover: number;

  @Column({ type: 'smallint' })
  spRecover: number;
}

@Entity('item_wearable')
export class ItemWearable extends Common {
  @Column({ type: 'enum', enum: WearableType })
  wearableType: ArmorType | WeaponType;

  @Column({ type: 'smallint' })
  attackPower: number;

  @Column({ type: 'smallint' })
  attackPowerByLv: number;

  @Column({ type: 'smallint' })
  defense: number;

  @Column({ type: 'smallint' })
  defenseByLv: number;

  @Column({ type: 'smallint' })
  skillAmp: number;

  @Column({ type: 'smallint' })
  skillAmpByLevel: number;

  @Column({ type: 'smallint' })
  adaptiveForce: number;

  @Column({ type: 'smallint' })
  maxHp: number;

  @Column({ type: 'smallint' })
  maxHpByLv: number;

  @Column({ type: 'smallint' })
  maxSp: number;

  @NumericColumn({ precision: 5, scale: 4 })
  hpRegenRatio: number;

  @NumericColumn({ precision: 5, scale: 4 })
  spRegenRatio: number;

  @Column({ type: 'smallint' })
  spRegen: number;

  @NumericColumn({ precision: 5, scale: 4 })
  attackSpeedRatio: number;

  @NumericColumn({ precision: 5, scale: 4 })
  attackSpeedRatioByLv: number;

  @NumericColumn({ precision: 5, scale: 4 })
  criticalStrikeChance: number;

  @NumericColumn({ precision: 5, scale: 4 })
  criticalStrikeDamage: number;

  @NumericColumn({ precision: 5, scale: 4 })
  cooldownReduction: number;

  @NumericColumn({ precision: 5, scale: 4 })
  lifeSteal: number;

  @NumericColumn({ precision: 5, scale: 4 })
  normalLifeSteal: number;

  @NumericColumn({ precision: 5, scale: 4 })
  moveSpeed: number;

  @NumericColumn({ precision: 5, scale: 4 })
  sightRange: number;

  @NumericColumn({ precision: 5, scale: 4 })
  preventBasicAttackDamagedRatio: number;

  @NumericColumn({ precision: 5, scale: 4 })
  increaseBasicAttackDamageRatioByLv: number;

  @NumericColumn({ precision: 5, scale: 4 })
  preventSkillDamagedRatio: number;

  @Column({ type: 'smallint' })
  penetrationDefense: number;

  @NumericColumn({ precision: 5, scale: 4 })
  penetrationDefenseRatio: number;

  @NumericColumn({ precision: 5, scale: 4 })
  healerGiveHpHealRatio: number;

  @NumericColumn({ precision: 5, scale: 4 })
  uniqueAttackRange: number;

  @NumericColumn({ precision: 5, scale: 4 })
  uniqueCooldownLimit: number;

  @NumericColumn({ precision: 5, scale: 4 })
  uniqueTenacity: number;

  @NumericColumn({ precision: 5, scale: 4 })
  uniqueMoveSpeed: number;

  @NumericColumn({ precision: 5, scale: 4 })
  uniqueSkillAmpRatio: number;
}
