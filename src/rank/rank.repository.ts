import { DataSource, Repository } from 'typeorm';
import { Ranking } from './ranking.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Updated } from './updated.entity';
import { RankRO } from './rank.interface';

@Injectable()
export class RankRepository {
  constructor(
    private readonly datasource: DataSource,
    @InjectRepository(Ranking)
    private readonly rankRepository: Repository<Ranking>,
    @InjectRepository(Updated)
    private readonly updatedRepository: Repository<Updated>,
  ) {}
  async getRanking(seasonId: number, page: number, count: number = 100): Promise<RankRO> {
    const data = await this.rankRepository.find({
      order: {
        mmr: 'DESC',
        nickname: 'ASC',
      },
      where: { seasonId },
      take: count,
      skip: (page - 1) * 100,
    });
    const updated = await this.updatedRepository.findOne({
      where: {
        seasonId,
      },
    });
    if (data.length > 0 && updated) {
      return {
        data,
        updated: updated.updated,
      };
    }
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
