import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ConsumableType, ItemGrade, ItemType, WearableType } from './item-type.enum';

@Entity('item_consumable')
export class ItemConsumable {
  @PrimaryColumn()
  code: number;

  @Column()
  name: string;

  @Column({
    enum: ItemType,
  })
  itemType: ItemType;

  @Column({
    enum: ConsumableType,
  })
  consumableType: ConsumableType;

  @Column({
    enum: ItemGrade,
  })
  itemGrade: ItemGrade;

  @Column()
  hpRecover: number;

  @Column()
  spRecover: number;
}

@Entity('item_wearable')
export class ItemWearable {
  @PrimaryColumn()
  code: number;

  @Column()
  name: string;

  @Column({
    enum: ItemType,
  })
  itemType: ItemType;

  @Column({
    enum: WearableType,
  })
  wearableType: WearableType;

  @Column({
    enum: ItemGrade,
  })
  itemGrade: ItemGrade;

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

  @Column()
  hpRegenRatio: number;

  @Column()
  spRegenRatio: number;

  @Column()
  spRegen: number;

  @Column()
  attackSpeedRatio: number;

  @Column()
  attackSpeedRatioByLv: number;

  @Column()
  criticalStrikeChance: number;

  @Column()
  criticalStrikeDamage: number;

  @Column()
  cooldownReduction: number;

  @Column()
  lifeSteal: number;

  @Column()
  normalLifeSteal: number;

  @Column()
  moveSpeed: number;

  @Column()
  sightRange: number;

  @Column()
  preventBasicAttackDamagedRatio: number;

  @Column()
  increaseBasicAttackDamageRatioByLv: number;

  @Column()
  preventSkillDamagedRatio: number;

  @Column()
  penetrationDefense: number;

  @Column()
  penetrationDefenseRatio: number;

  @Column()
  healerGiveHpHealRatio: number;

  @Column()
  uniqueAttackRange: number;

  @Column()
  uniqueCooldownLimit: number;

  @Column()
  uniqueTenacity: number;

  @Column()
  uniqueMoveSpeed: number;

  @Column()
  uniqueSkillAmpRatio: number;
}
