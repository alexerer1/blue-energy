// reading.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Reading {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sourceFile!: string;

  @Column()
  timestamp!: Date;

  @Column({ nullable: true })
  statusRaw?: number;

  @Column({ type: 'float', nullable: true })
  headtankLevel?: number;

  @Column({ type: 'float', nullable: true })
  temperatureLevel?: number;

  @Column({ type: 'float', nullable: true })
  batteryLevel?: number;

  @Column({ type: 'float', nullable: true })
  ACvoltLevel?: number;

  @Column({ type: 'float', nullable: true })
  enabledLoads?: number;

  @Column({ type: 'float', nullable: true })
  balast?: number;
}
