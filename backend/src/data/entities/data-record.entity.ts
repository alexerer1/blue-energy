import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DataRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  fileName!: string;

  @Column({ type: 'text' })
  content!: string;
}
