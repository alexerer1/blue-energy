import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileRecord } from './entities/file-record.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileRecord)
    private readonly fileRecordRepo: Repository<FileRecord>
  ) {}

  // Get all FileRecords
  findAll(): Promise<FileRecord[]> {
    return this.fileRecordRepo.find(); // [] if none
  }

  // Get one FileRecord by ID
  async findOne(id: number): Promise<FileRecord> {
    const record = await this.fileRecordRepo.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException(`FileRecord #${id} not found`);
    }
    return record;
  }

  // Create a new FileRecord
  create(dto: Partial<FileRecord>): Promise<FileRecord> {
    const record = this.fileRecordRepo.create(dto);
    return this.fileRecordRepo.save(record);
  }

  // Update a FileRecord
  async update(id: number, dto: Partial<FileRecord>): Promise<FileRecord> {
    const record = await this.findOne(id);
    Object.assign(record, dto);
    return this.fileRecordRepo.save(record);
  }

  // Delete a FileRecord
  async remove(id: number): Promise<void> {
    const record = await this.findOne(id);
    await this.fileRecordRepo.remove(record);
  }
}
