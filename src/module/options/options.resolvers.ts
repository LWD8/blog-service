import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OptionsService } from './options.service';
import { Info } from './decorators/options.decorators';
import { OptionsDto } from './dto/options.dto';

@Resolver('Options')
export class OptionsResolver {
  constructor(private readonly optionsService: OptionsService) {}

  /**
   * 获取网站信息
   */
  @Query()
  public getOptions() {
    return this.optionsService.getOptions();
  }

  /**
   * 更新网站信息
   */
  @Mutation()
  public updateOptions(@Info() optionsInfo: OptionsDto) {
    return this.optionsService.updateOptions(optionsInfo);
  }
}
