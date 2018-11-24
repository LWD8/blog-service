import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import { config } from '@/config';
import crypto from 'crypto';

@Entity()
export class Auths {
  @ObjectIdColumn()
  public _id: ObjectID;

  @Column({
    default: ''
  })
  public name: string;

  @Column({
    default: config.DEFAULT_USERNAME
  })
  public username: string;

  @Column()
  public slogan: string;

  @Column()
  public gravatar: string;

  @Column({
    default: crypto
      .createHash('md5')
      .update(config.DEFAULT_PASSWORD)
      .digest('hex')
  })
  public password: string;
}
