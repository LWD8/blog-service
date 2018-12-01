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

  @Column()
  public url: string;

  @CreateDateColumn()
  public create_time: Date;

  @UpdateDateColumn()
  public update_time: Date;
}
