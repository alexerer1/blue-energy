// src/data/data.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataRecord } from './entities/data-record.entity';
import { Reading } from './entities/reading.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DataRecord, Reading]),
    // Add more entities as needed
  ],
  exports: [TypeOrmModule],
})
export class DataModule {}
