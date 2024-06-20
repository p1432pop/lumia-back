import { DataSource, Repository } from 'typeorm';
import { Ranking } from './ranking.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Updated } from './updated.entity';

@Injectable()
export class RankRepository {
  constructor(
    private readonly datasource: DataSource,
    @InjectRepository(Ranking)
    private readonly rankRepository: Repository<Ranking>,
    @InjectRepository(Updated)
    private readonly updatedRepository: Repository<Updated>,
  ) {}
  async getRanking(seasonId: number, page: number, count: number = 100): Promise<Ranking[]> {
    const result = await this.rankRepository.find({
      where: { seasonId },
      order: {
        mmr: 'DESC',
        nickname: 'ASC',
      },
      take: count,
      skip: (page - 1) * 100,
    });
    if (result.length > 0) return result;
    throw new NotFoundException();
  }
  async getUpdatedTime(seasonId: number): Promise<Updated> {
    const result = await this.updatedRepository.findOne({ where: { seasonId } });
    if (result) return result;
    throw new NotFoundException();
  }

  async updateRanking(users: Ranking[], seasonId: number): Promise<void> {
    const qr = this.datasource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();
    try {
      await this.rankRepository.delete({ seasonId });
      await this.rankRepository.insert(users);
      await this.updatedRepository.save({ seasonId, updated: new Date() });
    } catch (e) {
      console.log(e);
      await qr.rollbackTransaction();
    } finally {
      await qr.release();
    }
  }
}
