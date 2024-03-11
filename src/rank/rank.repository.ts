import { Repository } from 'typeorm';
import { Ranking2 } from './season2.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/rank/game.entity';

@Injectable()
export class RankRepository {
  constructor(
    @InjectRepository(Ranking2)
    private readonly rankRepository: Repository<Ranking2>,

    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}
  async insertGames(games: Promise<Game[]>) {
    await this.gameRepository
      .createQueryBuilder()
      .insert()
      .into(Game)
      .values(await games)
      .execute();
  }
  async getRank(): Promise<any> {
    const rows = await this.rankRepository.find();
    return { data: rows, updated: '2023-11-09T16:00:00+09:00' };
  }

  async updateRanking(users: Promise<Ranking2[]>) {
    console.log('start repo');
    const rows = await this.rankRepository
      .createQueryBuilder()
      .insert()
      .into(Ranking2)
      .values(await users)
      .execute();
    console.log('end repo');
  }
}
