import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataRecord } from '../entities/data-record.entity';
import { Setting } from '../entities/setting.entity';
import { DataProcessingService } from './data-processing.service';
import { DataProcessingController } from './data-processing.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DataRecord, Setting])],
  providers: [DataProcessingService],
  controllers: [DataProcessingController],
  exports: [DataProcessingService],
})
export class DataProcessingModule {}
