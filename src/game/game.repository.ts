import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './game.entity';

@Injectable()
export class GameRepository {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}
  async get(userNum: number) {
    return await this.gameRepository.find({ order: { gameId: 'DESC' }, where: { userNum }, take: 30 });
  }
  async insertGames(games: Game[]): Promise<void> {
    await this.gameRepository.insert(games);
  }
}
