import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsResolver } from './options.resolvers';
import { MongooseModule } from '@nestjs/mongoose';
import { OptionsSchema } from './schema/options.shema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Options } from './options.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Options])],
  providers: [OptionsService, OptionsResolver]
})
export class OptionsModule {}
