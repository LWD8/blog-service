import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Options } from './options.entity';
import { MongoRepository } from 'typeorm';

import { ObjectID } from 'mongodb';
import { OptionsDto } from './dto/options.dto';

@Injectable()
export class OptionsService {
  constructor(@InjectRepository(Options) private readonly optionsRepository: MongoRepository<Options>) {}

  public getOptions() {
    return this.optionsRepository.findOne();
  }

  public async updateOptions(options: OptionsDto) {
    if (options._id) {
      const id = options._id;
      delete options._id;
      const result = await this.optionsRepository.findOneAndUpdate(
        { _id: new ObjectID(id) },
        { $set: { ...options, update_time: new Date() } },
        { returnOriginal: false }
      );
      return result.value;
    }
    const result = await this.optionsRepository.create({ create_time: new Date(), ...options });
    return this.optionsRepository.save(result);
  }
}
