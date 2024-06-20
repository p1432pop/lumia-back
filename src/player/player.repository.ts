import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './player.entity';

@Injectable()
export class PlayerRepository {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}
  async getPlayerByUserNum(userNum: number): Promise<Player | null> {
    return await this.playerRepository.findOne({ where: { userNum } });
  }
  async getUpdatedByUserNum(userNum: number): Promise<Date> {
    const result = await this.playerRepository.findOne({
      select: { updated: true },
      where: { userNum },
    });
    if (result) return result.updated;
    throw new NotFoundException();
  }
  async getLastGameIdByUserNum(userNum: number): Promise<number> {
    const result = await this.playerRepository.findOne({
      select: { lastGameId: true },
      where: { userNum },
    });
    if (result) return result.lastGameId;
    throw new NotFoundException();
  }
  async updatePlayer(player: Player): Promise<Player> {
    return await this.playerRepository.save(player);
  }
}
