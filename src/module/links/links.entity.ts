import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';

@Entity()
export class Links {
  @ObjectIdColumn()
  public _id: ObjectID;

  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  public url: string;

  @CreateDateColumn()
  public createAt: Date;

  @UpdateDateColumn()
  public updateAt: Date;
}
