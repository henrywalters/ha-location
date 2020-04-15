import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {LocationModule} from "./modules/location.module";

@Module({
  imports: [
      TypeOrmModule.forRoot(),
      ConfigModule.forRoot({
          isGlobal: true,
      }),

      LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
