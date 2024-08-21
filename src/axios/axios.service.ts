import { Injectable, OnModuleInit, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import {
  BaseResponse,
  ItemWeaponResponse,
  ItemArmorResponse,
  ItemConsumableResponse,
  GameResponse,
  RankResponse,
  UserStatResponse,
  NewsResponse,
} from './open-api/response';
import { AppLogger } from 'src/shared/logger/logger.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue, QueueEvents } from 'bullmq';
import { AxiosQueueOptions } from './axios.interface';
import { AxiosQueuePriority } from './axios.enum';
import { EnvironmentVariables } from 'src/shared/validator/env.validator';

@Injectable()
export class AxiosService implements OnModuleInit {
  private readonly axiosInstance: AxiosInstance;
  private readonly classTransformOptions: ClassTransformOptions;
  private readonly queueEvents: QueueEvents;

  constructor(
    @InjectQueue('axios-limited-queue')
    private readonly axiosQueue: Queue,
    private readonly configService: ConfigService<EnvironmentVariables, true>,
    private readonly logger: AppLogger,
  ) {
    this.axiosInstance = axios.create({
      baseURL: 'https://open-api.bser.io',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.configService.get('BSER_API_KEY'),
      },
    });
    this.classTransformOptions = {
      strategy: 'excludeAll',
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    };
    this.logger.setContext(AxiosService.name);
    this.queueEvents = new QueueEvents('axios-limited-queue');
  }

  async onModuleInit() {
    await this.axiosQueue.obliterate({ force: true });
    this.logger.log('axios queue cleaned');
  }

  private async addQueue<T extends BaseResponse>(url: string, classType: Type<T>, options?: AxiosQueueOptions): Promise<T | null> {
    try {
      const job = await this.axiosQueue.add(
        url,
        { url },
        {
          attempts: options?.attempts || 3,
          backoff: {
            type: 'fixed',
            delay: 1000,
          },
          priority: options?.priority || AxiosQueuePriority.HIGH,
          delay: options?.delay,
          removeOnComplete: true,
          removeOnFail: true,
        },
      );
      const result = await job.waitUntilFinished(this.queueEvents);
      return plainToInstance(classType, result, this.classTransformOptions);
    } catch (err) {
      return null;
    }
  }

  async axiosfetch<T extends BaseResponse>(url: string): Promise<T> {
    const result = await this.axiosInstance.get<T>(url);
    return result.data;
  }

  async getItemWeapon(options?: AxiosQueueOptions): Promise<ItemWeaponResponse | null> {
    return await this.addQueue<ItemWeaponResponse>('/v2/data/ItemWeapon', ItemWeaponResponse, options);
  }

  async getItemArmor(options?: AxiosQueueOptions): Promise<ItemArmorResponse | null> {
    return await this.addQueue<ItemArmorResponse>('/v2/data/ItemArmor', ItemArmorResponse, options);
  }

  async getItemConsumable(options?: AxiosQueueOptions): Promise<ItemConsumableResponse | null> {
    return await this.addQueue<ItemConsumableResponse>('/v2/data/ItemConsumable', ItemConsumableResponse, options);
  }

  async getGame(gameId: number, options?: AxiosQueueOptions): Promise<GameResponse | null> {
    return await this.addQueue<GameResponse>(`/v1/games/${gameId}`, GameResponse, options);
  }

  async getTopRanks(seasonId: number, options?: AxiosQueueOptions): Promise<RankResponse | null> {
    return await this.addQueue<RankResponse>(`/v1/rank/top/${seasonId}/3`, RankResponse, options);
  }

  async getUserStat(userNum: number, seasonId: number, options?: AxiosQueueOptions): Promise<UserStatResponse | null> {
    return await this.addQueue<UserStatResponse>(`/v1/user/stats/${userNum}/${seasonId}`, UserStatResponse, options);
  }

  async getNews(page: number = 1): Promise<NewsResponse | null> {
    try {
      const result = await axios.get<NewsResponse>(`https://playeternalreturn.com/api/v1/posts/news?page=${page}`, {
        headers: {
          'Accept-Language': 'ko',
        },
      });
      return result.data;
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }
}
