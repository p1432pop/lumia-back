import { BaseEntity, Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryColumn()
  userNum: number;

  @Column()
  nickname: string;

  @UpdateDateColumn()
  abc: number;
}
