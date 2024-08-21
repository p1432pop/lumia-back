import { ConfigService } from '@nestjs/config';
import { QueueOptions } from 'bullmq';

export const queueFactory = (configService: ConfigService): QueueOptions => ({
  connection: {
    host: configService.get('REDIS_HOST'),
    port: configService.get('REDIS_PORT'),
  },
});
