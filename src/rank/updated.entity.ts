import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('updated')
export class Updated extends BaseEntity {
  @PrimaryColumn()
  seasonId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;
}
