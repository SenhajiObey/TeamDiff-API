import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ChallengesController } from './challenges/controllers/challenges.controller';
import { MatchController } from './match/controllers/match.controller';
import { SummonerController } from './summoner/controllers/summoner.controller';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, MatchController, ChallengesController,SummonerController,UsersController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  AppService],
})
export class AppModule {}
