import { DataSource, Repository } from 'typeorm';
import { Ranking } from './ranking.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Updated } from './updated.entity';
import { RankFetchDTO } from './dto/rank-fetch.dto';

@Injectable()
export class RankRepository {
  constructor(
    private readonly datasource: DataSource,
    @InjectRepository(Ranking)
    private readonly rankRepository: Repository<Ranking>,
    @InjectRepository(Updated)
    private readonly updatedRepository: Repository<Updated>,
  ) {}
  async getRanking(seasonId: number): Promise<RankFetchDTO> {
    const data = await this.rankRepository.find({
      order: {
        mmr: 'DESC',
        nickname: 'ASC',
      },
      where: { seasonId },
      take: 1000,
    });
    const updated = await this.updatedRepository.findOne({
      where: {
        seasonId,
      },
    });
    return {
      data,
      updated: updated.updated,
    };
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
