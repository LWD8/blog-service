import { Module, CacheModule } from '@nestjs/common';

import { AuthModule } from './module/auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { BlogLoggerModule } from './module/common/logger/logger.module';
import { BlogLogger } from './module/common/logger/logger';

import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionsModule } from './module/options/options.module';

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
