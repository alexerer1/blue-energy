// data-processing.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataRecord } from '../entities/data-record.entity';
import { Setting } from '../entities/setting.entity';

import * as fs from 'fs';
import * as path from 'path';

import { parseLogFile } from './helpers/parse-log-file';
import { ParsedReading } from '../data/interfaces/parsed-reading.interface';
import { Reading } from '../data/entities/reading.entity';

@Injectable()
export class DataProcessingService {
  private readonly logger = new Logger(DataProcessingService.name);

  constructor(
    @InjectRepository(DataRecord)
    private readonly dataRecordRepo: Repository<DataRecord>,

    @InjectRepository(Setting)
    private readonly settingRepo: Repository<Setting>,

    @InjectRepository(Reading)
    private readonly readingRepo: Repository<Reading>
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
      // 1) Find the directory from settings or default
      let inputDirectory = './data/input'; // default
      const dirSetting = await this.settingRepo.findOneBy({ key: 'inputDirectory' });
      if (dirSetting) {
        inputDirectory = dirSetting.value;
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
        if (!stats.isFile()) continue;

        // 3) Read content
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // 4) (optional) store raw DataRecord
        const record = this.dataRecordRepo.create({
          fileName: file,
          content: fileContent,
        });
        await this.dataRecordRepo.save(record);

        // 5) Parse the file to get structured readings
        //    We'll guess the date from the filename. E.g. "20230305_..." => "2023-03-05"
        const dateFromFile = this.extractDateFromFilename(file);
        const parsed = parseLogFile(fileContent, dateFromFile);

        // 6) Store readings in DB
        await this.saveParsedReadings(parsed, file);

        // 7) Move or delete the file afterward as needed
        // fs.unlinkSync(filePath);

        this.logger.log(`Processed file: ${file}`);
      }

      this.logger.log(`Processed ${files.length} file(s).`);
    } catch (error) {
      this.logger.error('Error processing files', error);
    }
  }

  /**
   * A small helper that tries to parse a date (YYYYMMDD) from the filename.
   * You can tailor this to your own naming convention.
   */
  private extractDateFromFilename(fileName: string): Date {
    // e.g. if file name is "20250106_something.txt" or "20250106.log"
    const match = fileName.match(/(\d{4})(\d{2})(\d{2})/);
    if (!match) {
      // fallback to "today" if parsing fails
      return new Date();
    }
    const [_, yyyy, mm, dd] = match;
    const year = parseInt(yyyy, 10);
    const month = parseInt(mm, 10) - 1; // zero-based
    const day = parseInt(dd, 10);
    return new Date(year, month, day);
  }

  /**
   * Save the parsed readings into your Reading entity
   * or any custom entity you might have.
   */
  private async saveParsedReadings(parsed: ParsedReading[], sourceFile: string): Promise<void> {
    if (!parsed || !parsed.length) return;

    // Convert each `ParsedReading` into a Reading entity
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
