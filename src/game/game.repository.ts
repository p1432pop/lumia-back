import { LessThanOrEqual, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { PlayerStatsRO } from 'src/player/player.interface';

@Injectable()
export class GameRepository {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}
  async get(userNum: number, next: number): Promise<Game[]> {
    return await this.gameRepository.find({
      order: {
        gameId: 'DESC',
      },
      where: {
        userNum,
        gameId: LessThanOrEqual(next),
      },
      take: 20,
    });
  }
  async getUserStats(userNum: number): Promise<PlayerStatsRO[]> {
    return await this.gameRepository
      .createQueryBuilder('game')
      .select('game.characterNum', 'characterCode')
      .addSelect('COUNT(*)', 'totalGames')
      .addSelect('COUNT(CASE WHEN game.victory = 1 THEN 1 END)', 'wins')
      .addSelect('COUNT(CASE WHEN game.gameRank <= 3 THEN 1 END)', 'top3')
      .addSelect('ROUND(AVG(game.playerKill), 2)', 'averageKills')
      .addSelect('ROUND(AVG(game.teamKill), 2)', 'averageTeamKills')
      .addSelect('ROUND(AVG(game.playerAssistant), 2)', 'averageAssistants')
      .addSelect('ROUND(AVG(game.monsterKill), 2)', 'averageHunts')
      .addSelect('ROUND(AVG(game.gameRank), 2)', 'averageRank')
      .addSelect('CAST(AVG(game.totalGainVFCredit) AS INTEGER)', 'averageGainVFCredit')
      .where({ userNum })
      .groupBy('game.characterNum')
      .orderBy('COUNT(*)', 'DESC')
      .getRawMany();
  }
  async insertGames(games: Game[]): Promise<void> {
    await this.gameRepository.insert(games);
  }
}
