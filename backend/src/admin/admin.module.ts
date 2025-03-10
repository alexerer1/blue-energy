import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from '../entities/setting.entity';
import { DataRecord } from '../entities/data-record.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Setting, DataRecord])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
