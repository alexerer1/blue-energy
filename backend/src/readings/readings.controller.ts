// src/readings/readings.controller.ts
import { Controller, Get, Param, ParseIntPipe, Post, Body, Patch, Delete } from '@nestjs/common';
import { ReadingsService } from './readings.service';
import { Reading } from './entities/reading.entity';

@Controller('readings')
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService) {}

  /**
   * GET /readings
   * Returns all readings (or []).
   */
  @Get()
  findAll(): Promise<Reading[]> {
    return this.readingsService.findAll();
  }

  /**
   * GET /readings/:id
   * Returns one reading or 404 if not found.
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Reading> {
    return this.readingsService.findOne(id);
  }

  /**
   * POST /readings
   * Creates a new reading.
   */
  @Post()
  create(@Body() dto: Partial<Reading>): Promise<Reading> {
    return this.readingsService.create(dto);
  }

  /**
   * PATCH /readings/:id
   * Updates a reading by ID or 404 if not found.
   */
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<Reading>): Promise<Reading> {
    return this.readingsService.update(id, dto);
  }

  /**
   * DELETE /readings/:id
   * Removes a reading by ID or 404 if not found.
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.readingsService.remove(id);
  }
}
