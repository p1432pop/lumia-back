import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserByNickname(nickname: string): Promise<User | null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userStats', 'userStat')
      .where('user.nickname ilike :nickname', { nickname })
      .orderBy('userStat.seasonId', 'DESC')
      .addOrderBy('userStat.mmr', 'DESC')
      .getOne();
  }

  async getUserByUserNum(userNum: number): Promise<User | null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userStats', 'userStat')
      .where('user.userNum = :userNum', { userNum })
      .orderBy('userStat.seasonId', 'DESC')
      .addOrderBy('userStat.mmr', 'DESC')
      .getOne();
  }

  async getRankSize(): Promise<number> {
    return await this.userRepository.createQueryBuilder('user').where('user.mmr is not null').getCount();
  }

  async getUserRank(userNum: number): Promise<number | null> {
    const result = await this.userRepository.query(
      `WITH rank_user AS (
        SELECT
          "userNum",
          RANK() OVER (ORDER BY mmr DESC) AS rank
        FROM
          "user"
        WHERE
          mmr IS NOT NULL
      )
      SELECT
        ru.rank as rank
      FROM
        rank_user ru
      WHERE
        ru."userNum" = $1
      limit 1`,
      [userNum],
    );
    if (result.length > 0) return parseInt(result[0].rank);
    return null;
  }

  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async upsertUsers(users: User[]): Promise<void> {
    await this.userRepository.upsert(users, ['userNum']);
  }
}
