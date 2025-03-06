import { Controller, Get, Body, Put, Post, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Setting } from '../entities/setting.entity';
import { DataRecord } from '../entities/data-record.entity';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('settings')
  async getSettings(): Promise<Setting[]> {
    return this.adminService.findAllSettings();
  }

  @Put('settings')
  async updateSetting(@Body() body: { key: string; value: string }) {
    return this.adminService.updateSetting(body.key, body.value);
  }

  @Get('records')
  async getAllRecords(): Promise<DataRecord[]> {
    return this.adminService.getAllDataRecords();
  }

  @Delete('records/:id')
  async deleteRecord(@Param('id', ParseIntPipe) id: number): Promise<string> {
    await this.adminService.deleteDataRecord(id);
    return `Record with ID ${id} has been deleted.`;
  }
}
