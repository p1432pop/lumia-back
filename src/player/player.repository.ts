import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './player.entity';

@Injectable()
export class PlayerRepository {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}
  async getPlayerByUserNum(userNum: number): Promise<Player> {
    return await this.playerRepository.findOne({ where: { userNum } });
  }
  async getUpdatedByUserNum(userNum: number) {
    return await this.playerRepository.findOne({
      select: { updated: true },
      where: { userNum },
    });
  }
  async getLastGameIdByUserNum(userNum: number) {
    return await this.playerRepository.findOne({
      select: { lastGameId: true },
      where: { userNum },
    });
  }
  async create(player: Player) {
    const dto = this.playerRepository.create(player);
    this.playerRepository.save(dto);
  }
  async createPlayer(userNum: number, nickname: string) {
    const dto = this.playerRepository.create({
      userNum,
      nickname,
    });
    this.playerRepository.save(dto);
  }
  async updatePlayer(player: Player) {
    return await this.playerRepository.save(player);
  }
}
