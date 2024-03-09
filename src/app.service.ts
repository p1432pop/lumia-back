import { Injectable } from '@nestjs/common';
import { AxiosService } from './axios/axios.service';

@Injectable()
export class AppService {
  constructor(private readonly axiosService: AxiosService) {}

  test() {
    return this.axiosService.test();
  }
}
