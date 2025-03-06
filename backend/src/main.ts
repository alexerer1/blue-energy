import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  // 1) Ensure the data folder exists
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // 2) Then start the NestJS app
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
