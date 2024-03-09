import { Module } from '@nestjs/common';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ranking2 } from './season2.entity';
import { RankRepository } from './rank.repository';
import { AxiosModule } from 'src/axios/axios.module';
import { AxiosService } from 'src/axios/axios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ranking2]), AxiosModule],
  controllers: [RankController],
  providers: [RankService, RankRepository, AxiosService],
})
export class RankModule {}
