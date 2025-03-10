// src/data/data.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reading } from '../readings/entities/reading.entity';
import { FileRecord } from '../files/entities/file-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileRecord, Reading]),
    // ... other feature modules if needed
  ],
  exports: [TypeOrmModule],
})
export class DataModule {}
