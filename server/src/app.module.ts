import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoteGateway } from './vote.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, VoteGateway],
})
export class AppModule {}
