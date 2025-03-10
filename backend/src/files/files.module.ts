import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRecord } from './entities/file-record.entity';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
  imports: [
    // Register the FileRecord repository
    TypeOrmModule.forFeature([FileRecord]),
  ],
  providers: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
