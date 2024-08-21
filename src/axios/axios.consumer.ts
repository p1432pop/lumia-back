import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { AppLogger } from 'src/shared/logger/logger.service';
import { EventEmitter } from 'stream';
import { AxiosService } from './axios.service';

@Processor('axios-limited-queue', { concurrency: 50, limiter: { max: 50, duration: 1000 } })
export class AxiosConsumer extends WorkerHost {
  constructor(
    private readonly logger: AppLogger,
    private readonly axiosService: AxiosService,
  ) {
    super();
    EventEmitter.setMaxListeners(2000);
    this.logger.setContext(AxiosConsumer.name);
  }

  async process(job: Job, token?: string): Promise<any> {
    return await this.axiosService.axiosfetch(job.data.url);
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    //this.logger.log(`${this.onActive.name} : ${job.data.url}`);
  }

  // Only for stuff or lost like Redis Connection Errors
  @OnWorkerEvent('error')
  onError(failedReason: Error) {
    this.logger.error(`${this.onError.name} : ${failedReason}`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    this.logger.error(`${this.onFailed.name} : ${job.data.url}\n${error}`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    //this.logger.log(`${this.onCompleted.name} : ${job.data.url}`);
  }
}
