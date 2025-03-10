import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepo: Repository<Setting>
  ) {}

  // (A) Convenience method to get the "inputDirectory" from row #1 (or null if it doesn't exist)
  async getInputDirectory(): Promise<string | null> {
    // Attempt to find the single row, e.g. with id=1
    const setting = await this.settingRepo.findOne({ where: { id: 1 } });
    return setting ? setting.inputDirectory : null;
  }

  // (B) Convenience method to update/create row #1's "inputDirectory"
  async updateInputDirectory(newPath: string): Promise<Setting> {
    // Try to find row #1
    let setting = await this.settingRepo.findOne({ where: { id: 1 } });
    if (!setting) {
      // If it doesn't exist, create a new row
      setting = this.settingRepo.create();
      // The primary column (id) is auto-generated, so just leave it blank
    }
    // Update the directory path
    setting.inputDirectory = newPath;
    return this.settingRepo.save(setting);
  }

  // ---------- OPTIONAL GENERAL CRUD BELOW ----------

  /**
   * Retrieve all settings as an array (you may only have one row).
   */
  findAll(): Promise<Setting[]> {
    return this.settingRepo.find();
  }

  /**
   * Retrieve a single Setting by ID.
   * Throws 404 if not found.
   */
  async findOne(id: number): Promise<Setting> {
    const setting = await this.settingRepo.findOne({ where: { id } });
    if (!setting) {
      throw new NotFoundException(`Setting #${id} not found`);
    }
    return setting;
  }

  /**
   * Create a new Setting (rarely needed if you only store one).
   */
  create(dto: Partial<Setting>): Promise<Setting> {
    const newSetting = this.settingRepo.create(dto);
    return this.settingRepo.save(newSetting);
  }

  /**
   * Update an existing Setting by ID.
   * Throws 404 if not found.
   */
  async update(id: number, dto: Partial<Setting>): Promise<Setting> {
    const setting = await this.findOne(id);
    Object.assign(setting, dto);
    return this.settingRepo.save(setting);
  }

  /**
   * Delete a Setting by ID.
   */
  async remove(id: number): Promise<void> {
    const setting = await this.findOne(id);
    await this.settingRepo.remove(setting);
  }
}
