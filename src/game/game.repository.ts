import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { UserGamesQueryDTO } from 'src/user/dto/request/userGamesQuery.dto';

@Injectable()
export class GameRepository {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  /**해당 유저의 20개의 게임 데이터를 리턴 No offset */
  async getUserGames(query: UserGamesQueryDTO): Promise<Game[]> {
    const { userNum, next, isRank } = query;
    const qb = this.gameRepository.createQueryBuilder('game');

    qb.leftJoin('game.user', 'user').addSelect('user.nickname');

    qb.where('user.userNum = :userNum', { userNum });
    if (next) {
      qb.andWhere('game.gameId < :gameId', { gameId: next });
    }
    if (typeof isRank === 'boolean') {
      qb.andWhere('game.isRank = :isRank', { isRank });
    }

    qb.orderBy('game.gameId', 'DESC');

    return await qb.take(20).getMany();
  }

  /**해당 게임에 참여한 모든 참가자의 데이터를 리턴 */
  async getGame(gameId: number): Promise<Game[]> {
    return await this.gameRepository
      .createQueryBuilder('game')
      .leftJoin('game.user', 'user')
      .addSelect('user.nickname')
      .where('game.gameId = :gameId', { gameId })
      .orderBy('game.gameRank', 'ASC')
      .addOrderBy('user.nickname', 'ASC')
      .getMany();
  }

  async getLastGameId(): Promise<number> {
    const result = await this.gameRepository.findOne({
      select: {
        gameId: true,
      },
      where: {},
      order: {
        gameId: 'DESC',
      },
    });
    if (result) return result.gameId;
    else return 0;
  }

  async insertGames(games: Game[]): Promise<void> {
    await this.gameRepository.insert(games);
  }
}
