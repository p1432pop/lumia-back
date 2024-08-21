import { ArmorType, ConsumableType, ItemGrade, ItemType, WeaponType } from 'src/item/item-type.enum';
import { Exclude, Expose } from 'class-transformer';
export class ItemConsumableVO {
  @Expose()
  code: number;

  @Expose()
  name: string;

  @Expose()
  modeType: number;

  @Expose()
  itemType: ItemType;

  @Expose()
  consumableType: ConsumableType;

  @Expose()
  itemGrade: ItemGrade;

  @Exclude()
  makeMaterial1: number;

  @Exclude()
  makeMaterial2: number;

  @Expose()
  hpRecover: number;

  @Expose()
  spRecover: number;
}

export class ItemCommonVO {
  @Expose()
  code: number;

  @Expose()
  name: string;

  @Expose()
  modeType: number;

  @Expose()
  itemType: ItemType;

  @Expose()
  itemGrade: ItemGrade;

  @Expose()
  isCompletedItem: boolean;

  @Expose()
  alertInSpectator: boolean;

  @Expose()
  markingType: string;

  @Expose()
  craftAnimTrigger: string;

  @Expose()
  stackable: number;

  @Expose()
  initialCount: number;

  @Expose()
  itemUsableType: string;

  @Expose()
  itemUsableValueList: number;

  @Expose()
  exclusiveProducer: number;

  @Expose()
  isRemovedFromPlayerCorpseInventoryWhenPlayerKilled: boolean;

  @Expose()
  makeMaterial1: number;

  @Expose()
  makeMaterial2: number;

  @Expose()
  makeCustomAction: string;

  @Expose()
  notDisarm: boolean;

  @Expose()
  manufacturableType: number;

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
  skillAmpRatio: number;

  @Expose()
  skillAmpRatioByLevel: number;

  @Expose()
  adaptiveForce: number;

  @Expose()
  adaptiveForceByLevel: number;

  @Expose()
  maxHp: number;

  @Expose()
  maxHpByLv: number;

  @Expose()
  hpRegenRatio: number;

  @Expose()
  hpRegen: number;

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
  preventCriticalStrikeDamaged: number;

  @Expose()
  cooldownLimit: number;

  @Expose()
  lifeSteal: number;

  @Expose()
  normalLifeSteal: number;

  @Expose()
  skillLifeSteal: number;

  @Expose()
  moveSpeed: number;

  @Expose()
  moveSpeedOutOfCombat: number;

  @Expose()
  sightRange: number;

  @Expose()
  attackRange: number;

  @Expose()
  increaseBasicAttackDamage: number;

  @Expose()
  increaseBasicAttackDamageByLv: number;

  @Expose()
  increaseBasicAttackDamageRatio: number;

  @Expose()
  increaseBasicAttackDamageRatioByLv: number;

  @Expose()
  preventBasicAttackDamaged: number;

  @Expose()
  preventBasicAttackDamagedByLv: number;

  @Expose()
  preventBasicAttackDamagedRatio: number;

  @Expose()
  preventBasicAttackDamagedRatioByLv: number;

  @Expose()
  preventSkillDamaged: number;

  @Expose()
  preventSkillDamagedByLv: number;

  @Expose()
  preventSkillDamagedRatio: number;

  @Expose()
  preventSkillDamagedRatioByLv: number;

  @Expose()
  penetrationDefense: number;

  @Expose()
  penetrationDefenseRatio: number;

  @Expose()
  trapDamageReduce: number;

  @Expose()
  trapDamageReduceRatio: number;

  @Expose()
  hpHealedIncreaseRatio: number;

  @Expose()
  healerGiveHpHealRatio: number;

  @Expose()
  uniqueAttackRange: number;

  @Expose()
  uniqueHpHealedIncreaseRatio: number;

  @Expose()
  uniqueCooldownLimit: number;

  @Expose()
  uniqueTenacity: number;

  @Expose()
  uniqueMoveSpeed: number;

  @Expose()
  uniquePenetrationDefense: number;

  @Expose()
  uniquePenetrationDefenseRatio: number;

  @Expose()
  uniqueLifeSteal: number;

  @Expose()
  uniqueSkillAmpRatio: number;

  @Expose()
  restoreItemWhenResurrected: boolean;

  @Expose()
  creditValueWhenConvertedToBounty: number;
}

export class ItemWeaponVO extends ItemCommonVO {
  @Expose()
  gradeBgOverride: string;

  @Expose()
  weaponType: WeaponType;

  @Expose()
  consumable: boolean;

  @Expose()
  maxSP: number;
}

export class ItemArmorVO extends ItemCommonVO {
  @Expose()
  armorType: ArmorType;

  @Expose()
  maxSp: number;
}
