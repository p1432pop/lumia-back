import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AxiosModule } from 'src/axios/axios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';
import { GameModule } from 'src/game/game.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AxiosModule, forwardRef(() => GameModule)],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
