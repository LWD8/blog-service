import { Test } from '@nestjs/testing';

import { OptionsModule } from '../options.module';
import { OptionsService } from '../options.service';

import mongoose from 'mongoose';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Options } from '../options.entity';

describe('options', () => {
  let optionsService: OptionsService;

  describe('object', () => {
    const mockRepository = {
      findOne() {
        return { username: 'jkchao' };
      },
      findOneAndUpdate() {
        return { value: 'jkchao' };
      },
      create() {
        // ..
      },
      save() {
        return { username: 'jkchao' };
      }
    };

    beforeAll(async () => {
      const module = await Test.createTestingModule({
        imports: [OptionsModule]
      })
        .overrideProvider(getRepositoryToken(Options))
        .useValue(mockRepository)
        .compile();

      optionsService = module.get<OptionsService>(OptionsService);
    });

    it('getOptions', async () => {
      const res = await optionsService.getOptions();
      expect(res).toMatchObject(mockRepository.findOne());
    });

    it('updateOptions width id', async () => {
      const res = await optionsService.updateOptions({ _id: '59ef13f0a3ad094f5d294da3' });
      expect(res).toBe('jkchao');
    });

    it('updateOptions', async () => {
      const res = await optionsService.updateOptions({ title: '' });
      expect(res).toMatchObject(mockRepository.save());
    });

    afterAll(async () => {
      await mongoose.disconnect();
    });
  });
});
