import { BaseEntity, BeforeUpdate, Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('player')
export class Player extends BaseEntity {
  @PrimaryColumn()
  userNum: number;

  @Column()
  nickname: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated = new Date();
  }
}
