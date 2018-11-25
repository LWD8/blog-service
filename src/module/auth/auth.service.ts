import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { InfoDto, AuthDto, InfoRequerdIdDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auths } from './auth.entity';
import { MongoRepository, Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    // @InjectModel('Auth') private readonly authModel: Model<AuthInterface>
    @InjectRepository(Auths) private readonly authRepository: Repository<Auths>
  ) {}

  /**
   * 根据用户名查找用户
   * @param username 用户名
   */
  public findOne(info?: InfoDto) {
    if (info && info._id) {
      return this.authRepository.findOne(info._id);
    }
    return this.authRepository.findOne({ ...info });
  }

  /**
   * 初始化创建用户
   * @param auth { username password }
   */
  public async create(auth: AuthDto) {
    return await this.authRepository.create(auth);
  }

  public async update(auth: InfoRequerdIdDto) {
    const id = auth._id;
    delete auth._id;
    const result = await this.authRepository.update(id, auth);
    console.log(result);
    return result;
    // return this.authRepository.findOneAndUpdate(auth._id, auth, { new: true });
  }
}
