import { BaseResponse } from './baseResponse.interface';
import { ArmorType, ConsumableType, ItemGrade, ItemType, WeaponType } from 'src/item/item-type.enum';

export interface ItemWeaponResponse extends BaseResponse {
  data: ItemWeaponAPI[];
}

export interface ItemArmorResponse extends BaseResponse {
  data: ItemArmorAPI[];
}

export interface ItemConsumableResponse extends BaseResponse {
  data: ItemConsumableAPI[];
}

export interface ItemWeaponAPI extends ItemCommonAPI {
  gradeBgOverride: string;
  weaponType: WeaponType;
  consumable: boolean;
  maxSP: number;
}

export interface ItemArmorAPI extends ItemCommonAPI {
  armorType: ArmorType;
  maxSp: number;
}

export interface ItemConsumableAPI {
  code: number;
  name: string;
  modeType: number;
  itemType: ItemType;
  consumableType: ConsumableType;
  consumableTag: string;
  itemGrade: ItemGrade;
  isCompletedItem: boolean;
  alertInSpectator: boolean;
  markingType: string;
  craftAnimTrigger: string;
  stackable: number;
  initialCount: number;
  itemUsableType: string;
  itemUsableValueList: number;
  exclusiveProducer: number;
  isRemovedFromPlayerCorpseInventoryWhenPlayerKilled: boolean;
  manufacturableType: number;
  makeMaterial1: number;
  makeMaterial2: number;
  heal: number;
  hpRecover: number;
  spRecover: number;
  attackPowerByBuff: number;
  defenseByBuff: number;
  skillAmpByBuff: number;
  skillAmpRatioByBuff: number;
  addStateCode: number;
  isVPadQuickSlotItem: boolean;
  restoreItemWhenResurrected: boolean;
  creditValueWhenConvertedToBounty: number;
  isReduceLootOnDeath: boolean;
}

export interface ItemCommonAPI {
  code: number;
  name: string;
  modeType: number;
  itemType: ItemType;
  itemGrade: ItemGrade;
  isCompletedItem: boolean;
  alertInSpectator: boolean;
  markingType: string;
  craftAnimTrigger: string;
  stackable: number;
  initialCount: number;
  itemUsableType: string;
  itemUsableValueList: number;
  exclusiveProducer: number;
  isRemovedFromPlayerCorpseInventoryWhenPlayerKilled: boolean;
  makeMaterial1: number;
  makeMaterial2: number;
  makeCustomAction: string;
  notDisarm: boolean;
  manufacturableType: number;
  attackPower: number;
  attackPowerByLv: number;
  defense: number;
  defenseByLv: number;
  skillAmp: number;
  skillAmpByLevel: number;
  skillAmpRatio: number;
  skillAmpRatioByLevel: number;
  adaptiveForce: number;
  adaptiveForceByLevel: number;
  maxHp: number;
  maxHpByLv: number;
  hpRegenRatio: number;
  hpRegen: number;
  spRegenRatio: number;
  spRegen: number;
  attackSpeedRatio: number;
  attackSpeedRatioByLv: number;
  criticalStrikeChance: number;
  criticalStrikeDamage: number;
  cooldownReduction: number;
  preventCriticalStrikeDamaged: number;
  cooldownLimit: number;
  lifeSteal: number;
  normalLifeSteal: number;
  skillLifeSteal: number;
  moveSpeed: number;
  moveSpeedOutOfCombat: number;
  sightRange: number;
  attackRange: number;
  increaseBasicAttackDamage: number;
  increaseBasicAttackDamageByLv: number;
  increaseBasicAttackDamageRatio: number;
  increaseBasicAttackDamageRatioByLv: number;
  preventBasicAttackDamaged: number;
  preventBasicAttackDamagedByLv: number;
  preventBasicAttackDamagedRatio: number;
  preventBasicAttackDamagedRatioByLv: number;
  preventSkillDamaged: number;
  preventSkillDamagedByLv: number;
  preventSkillDamagedRatio: number;
  preventSkillDamagedRatioByLv: number;
  penetrationDefense: number;
  penetrationDefenseRatio: number;
  trapDamageReduce: number;
  trapDamageReduceRatio: number;
  hpHealedIncreaseRatio: number;
  healerGiveHpHealRatio: number;
  uniqueAttackRange: number;
  uniqueHpHealedIncreaseRatio: number;
  uniqueCooldownLimit: number;
  uniqueTenacity: number;
  uniqueMoveSpeed: number;
  uniquePenetrationDefense: number;
  uniquePenetrationDefenseRatio: number;
  uniqueLifeSteal: number;
  uniqueSkillAmpRatio: number;
  restoreItemWhenResurrected: boolean;
  creditValueWhenConvertedToBounty: number;
}
