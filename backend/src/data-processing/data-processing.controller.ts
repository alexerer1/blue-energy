import { Controller, Post } from '@nestjs/common';
import { DataProcessingService } from './data-processing.service';

@Controller('process')
export class DataProcessingController {
  constructor(private readonly dataProcessingService: DataProcessingService) {}

  @Post()
  async processFiles(): Promise<string> {
    await this.dataProcessingService.processDataFiles();
    return 'Files processed manually!';
  }
}
