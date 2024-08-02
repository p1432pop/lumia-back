import { Index, ViewColumn, ViewEntity } from 'typeorm';
import { Tier } from '../tier.enum';
import { IntViewColumn, NumericViewColumn } from 'src/shared/decorator/typeorm.decorator';

@ViewEntity({
  materialized: true,
  expression: `
  select
    ROW_NUMBER() OVER () AS id,
    "versionMajor", "versionMinor", "characterNum" as "characterCode", "bestWeapon", "isRank",
    case
      when "mmrBefore" >= 6800 then 'Mithril'
      when "mmrBefore" >= 5200 then 'Diamond'
      when "mmrBefore" >= 3800 then 'Platinum'
      when "mmrBefore" >= 2600 then 'Gold'
      when "mmrBefore" >= 1600 then 'Silver'
      when "mmrBefore" >= 800 then 'Bronze'
      else 'Iron'
    end as "tier",
    count(*) as "totalGames",
    count(case when "gameRank" = 1 then 1 end) as "wins",
    count(case when "gameRank" <= 3 then 1 end) as "top3",
    round(avg("playerKill"), 2) as "averageKills",
    round(avg("teamKill"), 2) as "averageTeamKills",
    round(avg("playerAssistant"), 2) as "averageAssistants",
    round(avg("monsterKill"), 2) as "averageHunts",
    round(avg("gameRank"), 2) as "averageRank",
    cast(avg("totalGainVFCredit") as integer) as "averageGainVFCredit",
    round(avg("mmrGain"), 2) as "mmrGain",
    cast(avg("damageToPlayer") as integer) as "averageDamageToPlayer",
    cast(avg("damageFromPlayer") as integer) as "averageDamageFromPlayer"
  from game
  group by "versionMajor", "versionMinor", "isRank", "tier", "characterNum", "bestWeapon"
  `,
  name: 'game_mat_view',
})
export class VersionStat {
  // Refresh CONCURRENTLY 옵션을 위한 Unique Index 설정
  @Index('row_num', { unique: true })
  @IntViewColumn()
  id: number;

  @IntViewColumn()
  versionMajor: number;

  @IntViewColumn()
  versionMinor: number;

  @ViewColumn()
  tier: Tier;

  @IntViewColumn()
  characterCode: number;

  @IntViewColumn()
  bestWeapon: number;

  @ViewColumn()
  isRank: boolean;

  @NumericViewColumn()
  mmrGain: number;

  @IntViewColumn()
  totalGames: number;

  @IntViewColumn()
  wins: number;

  @IntViewColumn()
  top3: number;

  @NumericViewColumn()
  averageKills: number;

  @NumericViewColumn()
  averageTeamKills: number;

  @NumericViewColumn()
  averageAssistants: number;

  @NumericViewColumn()
  averageHunts: number;

  @NumericViewColumn()
  averageRank: number;

  @IntViewColumn()
  averageDamageToPlayer: number;

  @IntViewColumn()
  averageDamageFromPlayer: number;

  @IntViewColumn()
  averageGainVFCredit: number;
}
