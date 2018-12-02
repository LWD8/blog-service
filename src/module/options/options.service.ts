import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Options } from './options.entity';
import { MongoRepository } from 'typeorm';

import { ObjectID } from 'mongodb';
import { OptionsDto } from './dto/options.dto';

@Injectable()
export class OptionsService {
  constructor(@InjectRepository(Options) private readonly optionsRepository: MongoRepository<Options>) {}

  /**
   * 获取网站信息
   */
  public getOptions() {
    return this.optionsRepository.findOne();
  }

  /**
   * 更新网站信息
   * @param options
   */
  public async updateOptions(options: Options) {
    if (options._id) {
      return await this.optionsRepository.save(options);
    }
    const result = await this.optionsRepository.create(options);
    return this.optionsRepository.save(result);
  }
}
