import { Entity, Column, BaseEntity } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class Options {
  @IsString()
  @IsNotEmpty()
  @Column()
  public title: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  public subTitle: string;

  @Column()
  public keyword: string;

  @Column()
  public descript: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  public url: string;

  @Column()
  public email: string;

  @Column()
  public icp: string;

  @Column()
  public meta: Meta;
}

class Meta {
  @Column({
    default: 0
  })
  public likes: number;
}
