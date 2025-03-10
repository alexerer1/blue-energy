// src/readings/readings.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reading } from './entities/reading.entity';
import { ReadingsService } from './readings.service';
import { ReadingsController } from './readings.controller';

@Module({
  imports: [
    // Provide the Reading repository to this module
    TypeOrmModule.forFeature([Reading]),
  ],
  providers: [ReadingsService],
  controllers: [ReadingsController],
})
export class ReadingsModule {}
