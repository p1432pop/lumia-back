import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { AxiosService } from 'src/axios/axios.service';
import { UserRepository } from './user.repository';
import { GameService } from 'src/game/game.service';
import { UpdateUserDTO } from './dto/request/update-user.dto';
import { UserGamesQueryDTO } from './dto/request/userGamesQuery.dto';
import { UserSeasonStat } from './entity/userSeasonStat.entity';
import { UserGamesDTO } from './dto/response/userGames.dto';
import { GameDTO } from 'src/game/dto/game.dto';
import { User } from './entity/user.entity';
import { UserDTO } from './dto/response/user.dto';
import { UserRank } from './dto/response/userRank.dto';
import { QueryRunner } from 'typeorm';
import _ from 'lodash';
import { AxiosQueuePriority } from 'src/axios/axios.enum';

@Injectable()
export class UserService {
  private readonly MAX_LENGTH = 20;
  constructor(
    private readonly axiosService: AxiosService,
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => GameService))
    private readonly gameService: GameService,
  ) {}

  async getUserByNickname(nickname: string): Promise<UserDTO | null> {
    const user = await this.userRepository.getUserByNickname(nickname);
    if (user) {
      return this.entityToDTO(user);
    }
    return null;
  }

  async getUserByUserNum(userNum: number): Promise<UserDTO | null> {
    const user = await this.userRepository.getUserByUserNum(userNum);
    if (user) {
      return this.entityToDTO(user);
    }
    return null;
  }

  async getUserGames(query: UserGamesQueryDTO): Promise<UserGamesDTO> {
    const games = await this.gameService.getUserGames(query);
    return {
      games,
      next: this.next(games),
    };
  }

  async getUserRank(userNum: number): Promise<UserRank> {
    const [rank, rankSize] = await Promise.all([this.userRepository.getUserRank(userNum), this.userRepository.getRankSize()]);
    if (rank) return { rank, rankSize };

    // Controller layer로 이동하도록
    throw new BadRequestException('user must have at least 1 rank game');
  }

  async updateUser(updateUserDto: UpdateUserDTO): Promise<UserDTO | null> {
    const { userNum } = updateUserDto;
    const user = await this.userRepository.getUserByUserNum(userNum);

    if (!user) {
      return null;
    }

    if (!user.updated) {
      let seasonIds: number[] = [];
      let results: UserSeasonStat[] = [];
      for (let i = 1; i < 25; i = i + 2) {
        seasonIds.push(i);
      }
      const userStatResponses = await Promise.all(
        seasonIds.map((seasonId: number) => this.axiosService.getUserStat(userNum, seasonId, { priority: AxiosQueuePriority.HIGH })),
      );
      userStatResponses.forEach((userStatResponse) => {
        if (!userStatResponse || !userStatResponse.userStats) {
          return;
        }
        userStatResponse.userStats.forEach((userStat) => {
          const entity = new UserSeasonStat();
          entity.userNum = userNum;
          entity.seasonId = userStat.seasonId;
          entity.matchingTeamMode = userStat.matchingTeamMode;
          entity.mmr = userStat.mmr;
          results.push(entity);
        });
      });
      user.userStats = results;
    }

    user.updated = new Date();
    const updatedUser = await this.userRepository.saveUser(user);
    return this.entityToDTO(updatedUser);
  }

  async upsertUser(user: User | User[], qr?: QueryRunner): Promise<void> {
    await this.userRepository.upsertUser(user, qr);
  }

  private entityToDTO(user: User): UserDTO {
    const userDTO: UserDTO = {
      ...user,
      prevStats: Object.values(_.groupBy(user.userStats, 'seasonId')),
    };
    return userDTO;
  }

  private next(games: GameDTO[]): number | undefined {
    if (games.length === this.MAX_LENGTH) return games[this.MAX_LENGTH - 1].gameId;
  }
}
