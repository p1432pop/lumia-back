import { LessThanOrEqual, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { CharacterStats } from 'src/player/dto/player.dto';

@Injectable()
export class GameRepository {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}
  /**해당 유저의 20개의 게임 데이터를 리턴 No offset */
  async getGamesByUserNum(userNum: number, next: number): Promise<Game[]> {
    const result = await this.gameRepository.find({
      order: {
        gameId: 'DESC',
      },
      where: {
        userNum,
        gameId: LessThanOrEqual(next),
      },
      take: 20,
    });
    if (result.length > 0) return result;
    throw new NotFoundException();
  }
  /**해당 게임에 참여한 모든 참가자의 데이터를 리턴 */
  async getGameByGameId(gameId: number): Promise<Game[]> {
    const result = await this.gameRepository.find({
      where: {
        gameId,
      },
      order: {
        gameRank: 'ASC',
      },
    });
    if (result.length > 0) return result;
    throw new NotFoundException();
  }
  async getTotalLastGameId(): Promise<number> {
    const result = await this.gameRepository.findOne({
      select: {
        gameId: true,
      },
      order: {
        gameId: 'DESC',
      },
    });
    if (result) return result.gameId;
    else return 0;
  }
  async getPlayerLastGameId(userNum: number): Promise<number> {
    const result = await this.gameRepository.findOne({
      select: {
        gameId: true,
      },
      order: {
        gameId: 'DESC',
      },
      where: {
        userNum,
      },
    });
    if (result) return result.gameId;
    else return 0;
  }
  async getUserStats(userNum: number): Promise<CharacterStats[]> {
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
  async getVersionStatistics(versionMajor: number, versionMinor: number) {
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
      .where({ versionMajor, versionMinor })
      .groupBy('game.characterNum')
      .getRawMany();
  }
  async insertGames(games: Game[]): Promise<void> {
    await this.gameRepository.insert(games);
  }
}
