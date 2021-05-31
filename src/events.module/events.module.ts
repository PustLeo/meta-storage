import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'nestjs-redis';
import { serviceProviders } from './services/providers';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    RedisModule,
    JwtModule.register({
      signOptions: { expiresIn: '60m', algorithm: 'RS256' },
      verifyOptions: { algorithms: ['RS256'] },
    }),
  ],
  providers: [EventsGateway, ...serviceProviders],
  exports: [JwtModule],
})
export class EventsModule {}
