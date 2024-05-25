import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ConsumableType, ItemGrade, ItemType, WearableType } from './item-type.enum';
import { NumericColumn } from 'src/shared/decorator/typeorm.decorator';

export abstract class Common {
  @PrimaryColumn()
  code: number;

  @Column()
  name: string;

  @Column({
    enum: ItemType,
  })
  itemType: ItemType;

  @Column({
    enum: ItemGrade,
  })
  itemGrade: ItemGrade;

  modeType: number;
}

@Entity('item_consumable')
export class ItemConsumable extends Common {
  @Column({
    enum: ConsumableType,
  })
  consumableType: ConsumableType;

  @Column()
  hpRecover: number;

  @Column()
  spRecover: number;
}

@Entity('item_wearable')
export class ItemWearable extends Common {
  @Column({
    enum: WearableType,
  })
  wearableType: WearableType;

  @Column()
  attackPower: number;

  @Column()
  attackPowerByLv: number;

  @Column()
  defense: number;

  @Column()
  defenseByLv: number;

  @Column()
  skillAmp: number;

  @Column()
  skillAmpByLevel: number;

  @Column()
  adaptiveForce: number;

  @Column()
  maxHp: number;

  @Column()
  maxHpByLv: number;

  @Column()
  maxSp: number;

  @NumericColumn()
  hpRegenRatio: number;

  @NumericColumn()
  spRegenRatio: number;

  @Column()
  spRegen: number;

  @NumericColumn()
  attackSpeedRatio: number;

  @NumericColumn()
  attackSpeedRatioByLv: number;

  @NumericColumn()
  criticalStrikeChance: number;

  @NumericColumn()
  criticalStrikeDamage: number;

  @NumericColumn()
  cooldownReduction: number;

  @NumericColumn()
  lifeSteal: number;

  @NumericColumn()
  normalLifeSteal: number;

  @NumericColumn()
  moveSpeed: number;

  @NumericColumn()
  sightRange: number;

  @Column()
  preventBasicAttackDamagedRatio: number;

  @NumericColumn()
  increaseBasicAttackDamageRatioByLv: number;

  @NumericColumn()
  preventSkillDamagedRatio: number;

  @Column()
  penetrationDefense: number;

  @NumericColumn()
  penetrationDefenseRatio: number;

  @NumericColumn()
  healerGiveHpHealRatio: number;

  @NumericColumn()
  uniqueAttackRange: number;

  @NumericColumn()
  uniqueCooldownLimit: number;

  @NumericColumn()
  uniqueTenacity: number;

  @NumericColumn()
  uniqueMoveSpeed: number;

  @NumericColumn()
  uniqueSkillAmpRatio: number;
}
