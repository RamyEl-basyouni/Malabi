import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:8081', 'http://localhost:19006', 'http://localhost:3001'],
    credentials: true,
  });
  console.log('🚀 Malabi backend server starting...');
  await app.listen(process.env.PORT ?? 3001);
  console.log('✅ Backend server running on http://localhost:3001');
}
bootstrap();
