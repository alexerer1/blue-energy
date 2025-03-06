import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataRecord } from '../entities/data-record.entity';
import { Setting } from '../entities/setting.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DataProcessingService {
  private readonly logger = new Logger(DataProcessingService.name);

  constructor(
    @InjectRepository(DataRecord)
    private readonly dataRecordRepo: Repository<DataRecord>,

    @InjectRepository(Setting)
    private readonly settingRepo: Repository<Setting>
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCron() {
    this.logger.log('Running data processing cron job');
    await this.processDataFiles();
  }

  /**
   * Manually trigger data processing if needed
   */
  async processDataFiles(): Promise<void> {
    try {
      // Example: read a Setting that might store the input directory
      let inputDirectory = './data/input'; // default
      const dirSetting = await this.settingRepo.findOneBy({ key: 'inputDirectory' });
      if (dirSetting) {
        inputDirectory = dirSetting.value;
      }

      // Check if directory exists
      if (!fs.existsSync(inputDirectory)) {
        this.logger.warn(`Directory does not exist: ${inputDirectory}`);
        return;
      }

      // Read all files in the directory
      const files = fs.readdirSync(inputDirectory);

      for (const file of files) {
        const filePath = path.join(inputDirectory, file);
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
          // For example, read the file as text
          const fileContent = fs.readFileSync(filePath, 'utf8');

          // Store a new DataRecord in the database
          const record = this.dataRecordRepo.create({
            fileName: file,
            content: fileContent,
          });
          await this.dataRecordRepo.save(record);

          // We could also move or delete the file afterward, etc.
          // fs.unlinkSync(filePath);
        }
      }

      this.logger.log(`Processed ${files.length} file(s).`);
    } catch (error) {
      this.logger.error('Error processing files', error);
    }
  }
}
