import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DataRetrievalService } from './data-retrieval.service';
import { DataRecord } from '../entities/data-record.entity';

@Controller('data')
export class DataRetrievalController {
  constructor(private readonly dataRetrievalService: DataRetrievalService) {}

  @Get()
  async getAllRecords(): Promise<DataRecord[]> {
    return this.dataRetrievalService.findAll();
  }

  @Get(':id')
  async getRecordById(@Param('id', ParseIntPipe) id: number): Promise<DataRecord> {
    return this.dataRetrievalService.findOne(id);
  }
}
