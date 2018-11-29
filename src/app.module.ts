import { Module, CacheModule } from '@nestjs/common';

import { HttpModule } from './module/common/http/http.module';
import { HttpCacheInterceptor } from './common/interceptors/httpCache.interceptor';
import { AuthModule } from './module/auth/auth.module';
import { OptionsModule } from './module/options/options.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { QiniuModule } from './module/qiniu/qiniu.module';
import { BlogLoggerModule } from './module/common/logger/logger.module';
import { BlogLogger } from './module/common/logger/logger';
import { LinksModule } from './module/links/links.module';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CacheModule.register({
      max: 5,
      ttl: 5
    }),
    GraphQLModule.forRootAsync({
      imports: [BlogLoggerModule],
      useFactory: async (logger: BlogLogger) => ({
        typePaths: ['./**/*.graphql'],
        path: '/api/v2',
        formatError: (error: Error) => {
          // logger.error(error.message);
          return error;
        }
      })
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'mongodb',
          host: '127.0.0.1',
          port: 27017,
          username: 'blog-server',
          password: 'blog-server',
          database: 'my_blog',
          entities: ['src/**/**.entity{.ts,.js}'],
          synchronize: true
        };
      }
    }),
    // MongooseModule.forRoot(config.MONGO_URL),
    AuthModule,
    OptionsModule
    // QiniuModule,
    // BlogLoggerModule,
    // LinksModule
  ],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: HttpCacheInterceptor
    // }
  ]
})
export class AppModule {}
