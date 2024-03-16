import { Injectable } from '@nestjs/common';
import { GameRepository } from './game.repository';
import { AxiosService } from 'src/axios/axios.service';

@Injectable()
export class GameService {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly axiosService: AxiosService,
  ) {}
  get(gameId: number) {
    return this.axiosService.getGameByGameId(gameId);
  }
}
