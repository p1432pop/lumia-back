import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('updated')
export class Updated {
  @PrimaryColumn()
  seasonId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;
}
