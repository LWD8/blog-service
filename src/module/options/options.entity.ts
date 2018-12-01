import { Entity, Column, ObjectIdColumn, ObjectID, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Options {
  @ObjectIdColumn()
  public _id: ObjectID;

  @Column()
  public title: string;

  @Column({
    name: 'sub_title'
  })
  public subTitle: string;

  @Column()
  public descript: string;

  @Column()
  public url: string;

  @Column()
  public email: string;

  @Column()
  public icp: string;

  @Column()
  public meta: object;

  @CreateDateColumn()
  public create_time: Date;

  @UpdateDateColumn()
  public update_time: Date;
}
