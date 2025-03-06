import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { DataProcessingModule } from './data-processing/data-processing.module';
import { DataRetrievalModule } from './data-retrieval/data-retrieval.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    // Scheduling module for cron jobs
    ScheduleModule.forRoot(),

    // TypeORM with SQLite
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    // Feature modules
    DataProcessingModule,
    DataRetrievalModule,
    AdminModule,
  ],
})
export class AppModule {}
