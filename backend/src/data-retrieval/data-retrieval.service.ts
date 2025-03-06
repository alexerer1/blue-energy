import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataRecord } from '../entities/data-record.entity';

@Injectable()
export class DataRetrievalService {
  constructor(
    @InjectRepository(DataRecord)
    private readonly dataRecordRepo: Repository<DataRecord>
  ) {}

  async findAll(): Promise<DataRecord[]> {
    return this.dataRecordRepo.find();
  }

  async findOne(id: number): Promise<DataRecord> {
    const record = await this.dataRecordRepo.findOne({ where: { id } });
    if (!record) {
      throw new Error(`DataRecord with id ${id} not found`);
    }
    return record;
  }
}
