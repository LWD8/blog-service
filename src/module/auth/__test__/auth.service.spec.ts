import { Test } from '@nestjs/testing';

import { AuthModule } from '../auth.module';
import { AuthService } from '../auth.service';
import { getModelToken } from '@nestjs/mongoose';

import mongoose from 'mongoose';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Auths } from '../auth.entity';
import { ObjectID } from 'typeorm';

describe('authServices', () => {
  let authService: AuthService;

  const mockRepository = {
    findOne() {
      return { username: 'jkchao' };
    },
    create() {
      return { username: 'jkchao' };
    },
    findOneAndUpdate() {
      return { value: 'jkchao' };
    }
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModule]
    })
      .overrideProvider(getRepositoryToken(Auths))
      .useValue(mockRepository)
      .compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('findOne empty argument', async () => {
    const res = await authService.findOne();
    expect(res).toMatchObject(mockRepository.findOne());
  });

  it('findOne', async () => {
    const res = await authService.create({ username: '', password: '' });
    expect(res).toMatchObject(mockRepository.create());
  });

  it('update', async () => {
    const res = await authService.update({
      _id: '59ef13f0a3ad094f5d294da3',
      oldPassword: ''
    });
    expect(res).toBe('jkchao');
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
