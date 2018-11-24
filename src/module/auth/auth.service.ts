import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { AuthInterface } from './interface/auth.interface';
import { InjectModel } from '@nestjs/mongoose';
import { InfoDto, AuthDto } from './dto/auth.dto';
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
    return this.authRepository.findOne({ ...info });
  }

  /**
   * 初始化创建用户
   * @param auth { username password }
   */
  public async create(auth: AuthDto) {
    return await this.authRepository.create(auth);
  }

  public async update(auth: InfoDto) {
    return this.authRepository.findOneAndUpdate(auth._id, auth, { new: true });
  }
}
