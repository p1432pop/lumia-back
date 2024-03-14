import { Injectable } from '@nestjs/common';
import { GameRepository } from './game.repository';

@Injectable()
export class GameService {
  constructor(private readonly gameRepository: GameRepository) {}
  get(userNum: number) {
    return this.gameRepository.get(userNum);
  }
}