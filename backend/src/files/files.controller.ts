import { Controller, Get, Param, ParseIntPipe, Post, Body, Patch, Delete } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileRecord } from './entities/file-record.entity';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  async getAll(): Promise<FileRecord[]> {
    return this.filesService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<FileRecord> {
    return this.filesService.findOne(id);
  }

  @Post()
  async create(@Body() dto: Partial<FileRecord>): Promise<FileRecord> {
    return this.filesService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<FileRecord>
  ): Promise<FileRecord> {
    return this.filesService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.filesService.remove(id);
  }
}
