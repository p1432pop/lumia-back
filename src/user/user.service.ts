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

  async post(updateUserDto: UpdateUserDTO): Promise<UserDTO | null> {
    const { userNum } = updateUserDto;
    const user = await this.userRepository.getUserByUserNum(userNum);

    if (!user) {
      return null;
    }

    if (!user.updated) {
      const userStats = await this.axiosService.getUserStatsByUserNum(userNum);
      user.userStats = userStats;
    }

    user.updated = new Date();
    const updatedUser = await this.userRepository.saveUser(user);
    return this.entityToDTO(updatedUser);
  }

  async upsertUsers(users: User[]): Promise<void> {
    await this.userRepository.upsertUsers(users);
  }

  private entityToDTO(user: User): UserDTO {
    const userDTO: UserDTO = {
      ...user,
      prevStats: this.groupBySeason(user.userStats),
    };
    return userDTO;
  }

  private groupBySeason(userStats: UserSeasonStat[]): UserSeasonStat[][] {
    const grouped = Object.values(
      userStats.reduce<Record<number, UserSeasonStat[]>>((acc, obj) => {
        if (!acc[obj.seasonId]) {
          acc[obj.seasonId] = [];
        }
        acc[obj.seasonId].push(obj);
        return acc;
      }, {}),
    );
    return grouped;
  }

  private next(games: GameDTO[]): number | undefined {
    if (games.length === this.MAX_LENGTH) return games[this.MAX_LENGTH - 1].gameId;
  }
}
