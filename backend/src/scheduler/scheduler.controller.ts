// src/scheduler/scheduler.controller.ts
import { Controller, Post } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';

@Controller('scheduler')
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  /**
   * POST /scheduler
   * Manually run the file processing logic
   */
  @Post()
  async processFiles(): Promise<string> {
    await this.schedulerService.processDataFiles();
    return 'Files processed manually!';
  }
}
