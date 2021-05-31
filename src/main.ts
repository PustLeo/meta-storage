import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(+process.env.APP_PORT, process.env.APP_HOST, (err, addr) => {
    if (err) {
      console.log(err);
    }
  });
}
bootstrap();
