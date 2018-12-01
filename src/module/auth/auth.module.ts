import { Module, OnModuleInit } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolvers } from './auth.resolvers';
import { config } from '@/config';
import { md5Decode } from '@/common/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auths } from './auth.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Auths])],
  providers: [AuthService, AuthResolvers]
})
export class AuthModule implements OnModuleInit {
  constructor(private readonly authService: AuthService) {}

  /**
   * 初始化创建用户
   */
  private async initUser() {
    const auth = await this.authService.findOne();
    if (!auth) {
      const password = md5Decode(config.DEFAULT_PASSWORD);

      await this.authService.create({
        username: config.DEFAULT_USERNAME,
        password
      });
    }
  }

  public async onModuleInit() {
    await this.initUser();
  }
}
