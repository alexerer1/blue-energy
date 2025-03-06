import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Setting } from '../entities/setting.entity';
import { DataRecord } from '../entities/data-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Setting, DataRecord])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
