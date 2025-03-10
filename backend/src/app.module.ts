import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from './settings/entities/setting.entity';
import { FilesModule } from './files/files.module';
import { ReadingsModule } from './readings/readings.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { SettingsModule } from './settings/settings.module';
import { FileRecord } from './files/entities/file-record.entity';
import { Reading } from './readings/entities/reading.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'src/data/database.sqlite',
      entities: [FileRecord, Reading, Setting],
      synchronize: true,
    }),
    FilesModule,
    ReadingsModule,
    SchedulerModule,
    SettingsModule,
  ],
})
export class AppModule {}
