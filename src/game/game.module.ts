import { forwardRef, Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { GameRepository } from './game.repository';
import { AxiosModule } from 'src/axios/axios.module';
import { UserModule } from 'src/user/user.module';
import { AppLoggerModule } from 'src/shared/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), AxiosModule, forwardRef(() => UserModule), AppLoggerModule],
  controllers: [GameController],
  providers: [GameService, GameRepository],
  exports: [GameService],
})
export class GameModule {}
