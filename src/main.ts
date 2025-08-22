import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  await app.listen(process.env.PORT ?? 3000);
}

function handleError(error: unknown) {
  console.error(error);
  process.exit(1);
}

bootstrap().catch(handleError);

process.on('uncaughtException', handleError);
