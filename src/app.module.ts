import { Module } from '@nestjs/common';
import { HealthModule } from './health.module/health.module';
import { EventsModule } from './events.module/events.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'nestjs-redis';
import { common } from './constants/common.const';

@Module({
  imports: [
    HealthModule,
    EventsModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    RedisModule.register({
      name: common.redisName,
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [ConfigModule, RedisModule],
})
export class AppModule {}
