import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto/request/update-user.dto';
import { SerializeInterceptor } from 'src/shared/interceptor/serialize.interceptor';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestDTO } from 'src/shared/dto/request/bad-request.dto';
import { NotFoundDTO } from 'src/shared/dto/request/not-found.dto';
import { UserGamesQueryDTO } from './dto/request/userGamesQuery.dto';
import { UserGamesDTO } from './dto/response/userGames.dto';
import { UserResponseDTO } from './dto/response/userResponse.dto';
import { UserRank } from './dto/response/userRank.dto';
import { PositiveIntPipe } from 'src/shared/pipe/positiveInt.pipe';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'fetch user data', description: 'fetch user data by nickname' })
  @ApiParam({ name: 'nickname', type: 'string', description: '유저의 닉네임' })
  @ApiResponse({ status: 200, description: '200 response', type: UserResponseDTO })
  @ApiBadRequestResponse({ description: '400 response', type: BadRequestDTO })
  @ApiNotFoundResponse({ description: '404 response', type: NotFoundDTO })
  @Get('profile/:nickname')
  @UseInterceptors(new SerializeInterceptor(UserResponseDTO))
  async getUserProfile(@Param('nickname') nickname: string): Promise<UserResponseDTO> {
    const user = await this.userService.getUserByNickname(nickname);
    if (user) return { code: 200, user };
    return { code: 404 };
  }

  @ApiOperation({ summary: 'fetch user games', description: 'fetch games by userNum' })
  @ApiResponse({ status: 200, description: '200 response', type: UserGamesDTO })
  @ApiBadRequestResponse({ description: '400 response', type: BadRequestDTO })
  @ApiNotFoundResponse({ description: '404 response', type: NotFoundDTO })
  @Get('games')
  @UseInterceptors(new SerializeInterceptor(UserGamesDTO))
  async getUserGames(@Query() query: UserGamesQueryDTO): Promise<UserGamesDTO> {
    return await this.userService.getUserGames(query);
  }

  @ApiOperation({ summary: 'fetch user rank', description: 'fetch rank by userNum' })
  @ApiParam({ name: 'userNum', type: 'integer', description: '유저의 고유 번호' })
  @ApiResponse({ status: 200, description: '200 response', type: UserRank })
  @ApiBadRequestResponse({ description: '400 response', type: BadRequestDTO })
  @ApiNotFoundResponse({ description: '404 response', type: NotFoundDTO })
  @Get('rank/:userNum')
  @UseInterceptors(new SerializeInterceptor(UserRank))
  async getUserRank(@Param('userNum', ParseIntPipe, PositiveIntPipe) userNum: number): Promise<UserRank> {
    return await this.userService.getUserRank(userNum);
  }

  @ApiOperation({ summary: 'update user data', description: 'update user data by userNum' })
  @ApiCreatedResponse({ description: '201 response', type: UserResponseDTO })
  @ApiBadRequestResponse({ description: '400 response', type: BadRequestDTO })
  @ApiNotFoundResponse({ description: '404 response', type: NotFoundDTO })
  @Post()
  @UseInterceptors(new SerializeInterceptor(UserResponseDTO))
  async updateUser(@Body() updateUserDto: UpdateUserDTO): Promise<UserResponseDTO> {
    const updatedUser = await this.userService.updateUser(updateUserDto);
    if (updatedUser) return { code: 200, user: updatedUser };
    return { code: 404 };
  }
}
