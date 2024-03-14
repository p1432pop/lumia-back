import { Repository } from 'typeorm';
import { Ranking } from './ranking.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RankRepository {
  constructor(
    @InjectRepository(Ranking)
    private readonly rankRepository: Repository<Ranking>,
  ) {}
  async getRanking(seasonId: number): Promise<Ranking[]> {
    return await this.rankRepository.find({
      order: {
        mmr: 'DESC',
      },
      where: { seasonId },
    });
  }

  async updateRanking(users: Promise<Ranking[]>) {
    const user = await users;
    await this.rankRepository.createQueryBuilder().insert().into(Ranking).values(user).execute();
  }
}
