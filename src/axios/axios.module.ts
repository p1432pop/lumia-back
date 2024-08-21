import { Module } from '@nestjs/common';
import { AxiosService } from './axios.service';
import { AppLoggerModule } from 'src/shared/logger/logger.module';
import { AxiosConsumer } from './axios.consumer';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    AppLoggerModule,
    BullModule.registerQueue({
      name: 'axios-limited-queue',
    }),
  ],
  providers: [AxiosService, AxiosConsumer],
  exports: [AxiosService],
})
export class AxiosModule {}
