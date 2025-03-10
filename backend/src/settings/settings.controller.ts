import { Controller, Get, Patch, Body, Param, ParseIntPipe, Post, Delete } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Setting } from './entities/setting.entity';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  /**
   * GET /settings/input-directory
   * Returns the current value (string) or null if not set.
   */
  @Get('input-directory')
  async getInputDirectory(): Promise<string | null> {
    return this.settingsService.getInputDirectory();
  }

  /**
   * PATCH /settings/input-directory
   * Expects { "newPath": "..." } in the body, updates/creates the setting row.
   */
  @Patch('input-directory')
  async updateInputDirectory(@Body('newPath') newPath: string): Promise<Setting> {
    return this.settingsService.updateInputDirectory(newPath);
  }

  // OPTIONAL: Expose the general CRUD endpoints if you want a more general settings approach

  @Get()
  async findAll(): Promise<Setting[]> {
    return this.settingsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Setting> {
    return this.settingsService.findOne(id);
  }

  @Post()
  async create(@Body() dto: Partial<Setting>): Promise<Setting> {
    return this.settingsService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<Setting>
  ): Promise<Setting> {
    return this.settingsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.settingsService.remove(id);
  }
}
