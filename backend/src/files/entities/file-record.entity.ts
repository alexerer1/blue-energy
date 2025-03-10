import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FileRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  fileName!: string;

  @Column({ type: 'text' })
  content!: string;
}
