import { DataSource, ViewEntity } from 'typeorm';
import { Game } from '../../game/game.entity';
import { IntViewColumn, NumericViewColumn } from 'src/shared/decorator/typeorm.decorator';

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('game.userNum', 'userNum')
      .addSelect('game.characterNum', 'characterCode')
      .addSelect('COUNT(*)', 'totalGames')
      .addSelect('COUNT(CASE WHEN game.gameRank = 1 THEN 1 END)', 'wins')
      .addSelect('COUNT(CASE WHEN game.gameRank <= 3 THEN 1 END)', 'top3')
      .addSelect('ROUND(AVG(game.playerKill), 2)', 'averageKills')
      .addSelect('ROUND(AVG(game.teamKill), 2)', 'averageTeamKills')
      .addSelect('ROUND(AVG(game.playerAssistant), 2)', 'averageAssistants')
      .addSelect('ROUND(AVG(game.monsterKill), 2)', 'averageHunts')
      .addSelect('ROUND(AVG(game.gameRank), 2)', 'averageRank')
      .addSelect('CAST(AVG(game.totalGainVFCredit) AS INTEGER)', 'averageGainVFCredit')
      .from(Game, 'game')
      .where('game.isRank = true')
      .groupBy('game.userNum')
      .addGroupBy('game.characterNum')
      .orderBy('COUNT(*)', 'DESC'),
  name: 'game_view',
})
export class UserCharStat {
  @IntViewColumn()
  userNum: number;

  @IntViewColumn()
  characterCode: number;

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
  averageGainVFCredit: number;
}
