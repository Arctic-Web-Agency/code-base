import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ENV } from './config/env';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable CORS with credentials for cookie-based auth
    app.enableCors({
        origin: true,
        credentials: true,
    });

    // Parse cookies for refresh token handling
    app.use(cookieParser());

    // Enable validation globally
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    await app.listen(ENV.PORT, '0.0.0.0');
}
bootstrap().finally();
