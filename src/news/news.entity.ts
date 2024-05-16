import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('news')
export class News {
  @PrimaryColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  title: string;
}
