import { Injectable } from '@nestjs/common';
import { AxiosService } from 'src/axios/axios.service';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemService {
  constructor(
    private readonly axiosService: AxiosService,
    private readonly itemRepository: ItemRepository,
  ) {}
}
