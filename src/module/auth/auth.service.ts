import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { InfoDto, AuthDto, InfoRequerdIdDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auths } from './auth.entity';
import { MongoRepository } from 'typeorm';

import { ObjectID } from 'mongodb';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Auths) private readonly authRepository: MongoRepository<Auths>) {}

  /**
   * 根据用户名查找用户
   * @param username 用户名
   */
  public findOne(info?: InfoDto) {
    if (info && info._id) {
      return this.authRepository.findOne(info._id);
    }
    // @ts-ignore
    return this.authRepository.findOne({ ...info });
  }

  /**
   * 初始化创建用户
   * @param auth { username password }
   */
  public async create(auth: AuthDto) {
    const user = await this.authRepository.create(auth);
    return this.authRepository.save(user);
  }

  /**
   * 更新用户信息
   * @param auth
   */
  public async update(auth: InfoRequerdIdDto) {
    const id = auth._id;
    delete auth._id;
    const result = await this.authRepository.findOneAndUpdate(
      { _id: new ObjectID(id) },
      { $set: auth },
      { returnOriginal: false }
    );
    return result.value;
  }
}
