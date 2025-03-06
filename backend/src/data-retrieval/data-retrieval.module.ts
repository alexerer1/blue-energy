import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataRecord } from '../entities/data-record.entity';
import { DataRetrievalService } from './data-retrieval.service';
import { DataRetrievalController } from './data-retrieval.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DataRecord])],
  providers: [DataRetrievalService],
  controllers: [DataRetrievalController],
})
export class DataRetrievalModule {}
