import { DataSource, Repository } from 'typeorm';
import { Ranking } from './entity/ranking.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Updated } from './entity/updated.entity';

@Injectable()
export class RankRepository {
  constructor(
    private readonly datasource: DataSource,
    @InjectRepository(Ranking)
    private readonly rankRepository: Repository<Ranking>,
    @InjectRepository(Updated)
    private readonly updatedRepository: Repository<Updated>,
  ) {}

  async getRanking(seasonId: number, page: number, count: number = 100): Promise<Updated | null> {
    // ------------------------------------------------------------------------------------------------
    // Issue : Entity Mapping is not work with SubQueryFactory and Join
    // https://github.com/typeorm/typeorm/issues/89
    // https://stackoverflow.com/questions/78377752/how-to-limit-children-while-left-joining-in-typeorm
    // https://stackoverflow.com/questions/66943353/limit-and-skip-related-column-in-typeorm
    // ------------------------------------------------------------------------------------------------
    const updated = await this.updatedRepository.findOne({ where: { seasonId } });
    if (updated) {
      updated.topRanks = await this.rankRepository.find({
        where: { seasonId },
        order: {
          mmr: 'DESC',
          nickname: 'ASC',
        },
        take: count,
        skip: (page - 1) * 100,
        relations: {
          characterStats: true,
        },
      });
    }
    return updated;
  }

  async updateRanking(users: Ranking[], seasonId: number): Promise<void> {
    const qr = this.datasource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();
    try {
      const updated = new Updated();
      updated.seasonId = seasonId;
      updated.topRanks = users;
      updated.updated = new Date();
      await qr.manager.getRepository(Updated).delete({ seasonId });
      await qr.manager.getRepository(Updated).save(updated);
      await qr.commitTransaction();
    } catch (e) {
      await qr.rollbackTransaction();
    } finally {
      await qr.release();
    }
  }
}
