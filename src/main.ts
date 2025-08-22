import cookie from '@fastify/cookie';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { AppConfigProviderToken, AppConfigService } from './contexts/shared';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  const config = app.get<AppConfigService>(AppConfigProviderToken);

  app.setGlobalPrefix(config.apiPrefix);

  await app.register(cookie, {
    secret: '',
    parseOptions: {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/',
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(config.port);
}

function handleError(error: unknown) {
  console.error(error);
  process.exit(1);
}

bootstrap().catch(handleError);

process.on('uncaughtException', handleError);
