import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    const port = process.env.PORT ?? 3005;
    await app.listen(port);
    console.log(`✅ Backend is running on http://localhost:${port}`);
  } catch (error) {
    console.error('❌ Failed to start the application:');
    console.error(error);
    process.exit(1);
  }
}
bootstrap();
