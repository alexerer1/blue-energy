import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  // 1) Ensure the "src/data" folder exists
  const dataDir = path.join(process.cwd(), 'src', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // 2) Optionally, create an empty SQLite file if it doesn't exist
  // (TypeORM will create it automatically, but this ensures the file is physically present.)
  const dbPath = path.join(dataDir, 'database.sqlite');
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '');
  }

  // 3) Start the NestJS app
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  console.log(`Application is running on: http://localhost:3000`);
}
bootstrap();
