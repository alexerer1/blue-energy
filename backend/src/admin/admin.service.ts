import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Setting } from '../entities/setting.entity';
import { DataRecord } from '../entities/data-record.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepo: Repository<Setting>,

    @InjectRepository(DataRecord)
    private readonly dataRecordRepo: Repository<DataRecord>
  ) {}

  async findAllSettings(): Promise<Setting[]> {
    return this.settingRepo.find();
  }

  async updateSetting(key: string, value: string): Promise<Setting> {
    let setting = await this.settingRepo.findOneBy({ key });
    if (!setting) {
      // create a new one
      setting = this.settingRepo.create({ key, value });
    } else {
      // update existing
      setting.value = value;
    }
    return this.settingRepo.save(setting);
  }

  async getAllDataRecords(): Promise<DataRecord[]> {
    return this.dataRecordRepo.find();
  }

  async deleteDataRecord(id: number): Promise<void> {
    await this.dataRecordRepo.delete(id);
  }
}
