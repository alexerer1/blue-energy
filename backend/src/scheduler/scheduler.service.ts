// src/scheduler/scheduler.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// If you renamed DataRecord → FileRecord:
import { FileRecord } from '../files/entities/file-record.entity';
import { Reading } from '../readings/entities/reading.entity';
import { Setting } from '../settings/entities/setting.entity'; // if you have a Setting entity

import * as fs from 'fs';
import * as path from 'path';

import { parseLogFile } from './helpers/parse-log-file';
import { ParsedReading } from '../data/interfaces/parsed-reading.interface';
// Example interface if you store parsed data

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    @InjectRepository(FileRecord)
    private readonly fileRecordRepo: Repository<FileRecord>,

    @InjectRepository(Setting)
    private readonly settingRepo: Repository<Setting>,

    @InjectRepository(Reading)
    private readonly readingRepo: Repository<Reading>
  ) {}

  /**
   * Cron job triggered every 30 minutes
   */
  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCron() {
    this.logger.log('Running scheduled file processing...');
    await this.processDataFiles();
  }

  /**
   * Manually trigger data processing if needed
   */
  async processDataFiles(): Promise<void> {
    try {
      // 1) Find the directory from settings or default
      let inputDirectory = './data/input'; // default
      // Attempt to fetch the single Setting row (with id = 1, for example)
      const setting = await this.settingRepo.findOne({ where: { id: 1 } });
      if (setting && setting.inputDirectory) {
        inputDirectory = setting.inputDirectory;
      }

      if (!fs.existsSync(inputDirectory)) {
        this.logger.warn(`Directory does not exist: ${inputDirectory}`);
        return;
      }

      // 2) Read files in directory
      const files = fs.readdirSync(inputDirectory);
      for (const file of files) {
        const filePath = path.join(inputDirectory, file);
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) {
          continue;
        }

        // 3) Read content
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // 4) Store raw file record in DB
        const record = this.fileRecordRepo.create({
          fileName: file,
          content: fileContent,
        });
        await this.fileRecordRepo.save(record);

        // 5) Parse structured readings
        const dateFromFile = this.extractDateFromFilename(file);
        const parsedReadings = parseLogFile(fileContent, dateFromFile);

        // 6) Save readings
        await this.saveParsedReadings(parsedReadings, file);

        // 7) Optionally move or delete the file
        // fs.unlinkSync(filePath);

        this.logger.log(`Processed file: ${file}`);
      }

      this.logger.log(`Processed ${files.length} file(s).`);
    } catch (error) {
      this.logger.error('Error processing files:', error);
    }
  }

  /**
   * Attempt to parse date from filename (YYYYMMDD).
   * Fallback to "now" if none found.
   */
  private extractDateFromFilename(fileName: string): Date {
    const match = fileName.match(/(\d{4})(\d{2})(\d{2})/);
    if (!match) {
      return new Date();
    }
    const [_, yyyy, mm, dd] = match;
    return new Date(parseInt(yyyy, 10), parseInt(mm, 10) - 1, parseInt(dd, 10));
  }

  /**
   * Convert the parsed logs into Reading entities and save them.
   */
  private async saveParsedReadings(parsed: ParsedReading[], sourceFile: string): Promise<void> {
    if (!parsed || !parsed.length) {
      return;
    }
    const toSave = parsed.map((r) => {
      const entity = new Reading();
      entity.sourceFile = sourceFile;
      entity.timestamp = r.timestamp;
      entity.statusRaw = r.statusRaw;
      entity.headtankLevel = r.headtankLevel;
      entity.temperatureLevel = r.temperatureLevel;
      entity.batteryLevel = r.batteryLevel;
      entity.ACvoltLevel = r.ACvoltLevel;
      entity.enabledLoads = r.enabledLoads;
      entity.balast = r.balast;
      return entity;
    });
    await this.readingRepo.save(toSave);
  }
}
