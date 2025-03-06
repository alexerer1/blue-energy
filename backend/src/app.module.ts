// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

// Imported feature modules
import { DataProcessingModule } from './data-processing/data-processing.module';
import { DataRetrievalModule } from './data-retrieval/data-retrieval.module';
import { AdminModule } from './admin/admin.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [
    // Scheduling module for cron jobs
    ScheduleModule.forRoot(),

    // Global TypeORM connection:
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      // This pattern picks up all .entity files in your src/data/entities folder
      entities: [__dirname + '/data/entities/*.entity{.ts,.js}'],
      // Alternatively:
      // entities: [Reading, DataRecord],
      synchronize: true,
    }),

    // Now import your own DataModule, which has TypeOrmModule.forFeature([...]) for the entities
    DataModule,

    // Other feature modules
    DataProcessingModule,
    DataRetrievalModule,
    AdminModule,
  ],
})
export class AppModule {}
