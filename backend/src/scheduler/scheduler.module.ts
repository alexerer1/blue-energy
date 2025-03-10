// src/scheduler/scheduler.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';
import { FileRecord } from '../files/entities/file-record.entity';
import { Reading } from '../readings/entities/reading.entity';
import { Setting } from '../settings/entities/setting.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
      FileRecord,
      Reading,
      Setting, // <-- Include Setting if the service directly injects the repository
    ]),
  ],
  providers: [SchedulerService],
  controllers: [SchedulerController],
  exports: [SchedulerService],
})
export class SchedulerModule {}
