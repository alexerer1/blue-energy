// src/readings/readings.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reading } from './entities/reading.entity';

@Injectable()
export class ReadingsService {
  constructor(
    @InjectRepository(Reading)
    private readonly readingRepository: Repository<Reading>
  ) {}

  /**
   * Get all readings.
   * Returns an empty array if none exist.
   */
  async findAll(): Promise<Reading[]> {
    return this.readingRepository.find();
  }

  /**
   * Get a single reading by ID.
   * Throws a 404 (NotFoundException) if none found.
   */
  async findOne(id: number): Promise<Reading> {
    const reading = await this.readingRepository.findOne({ where: { id } });
    if (!reading) {
      throw new NotFoundException(`Reading #${id} not found.`);
    }
    return reading;
  }

  /**
   * Create a new reading.
   */
  async create(dto: Partial<Reading>): Promise<Reading> {
    const newReading = this.readingRepository.create(dto);
    return this.readingRepository.save(newReading);
  }

  /**
   * Update a reading by ID.
   * Throws 404 if reading doesn't exist.
   */
  async update(id: number, dto: Partial<Reading>): Promise<Reading> {
    const reading = await this.findOne(id);
    Object.assign(reading, dto);
    return this.readingRepository.save(reading);
  }

  /**
   * Remove a reading by ID.
   * Throws 404 if reading doesn't exist.
   */
  async remove(id: number): Promise<void> {
    const reading = await this.findOne(id);
    await this.readingRepository.remove(reading);
  }
}
