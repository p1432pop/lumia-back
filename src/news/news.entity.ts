import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('news')
export class News {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  url: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;
}
