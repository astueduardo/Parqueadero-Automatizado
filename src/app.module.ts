import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ParkingLotsModule } from './modules/parking/parking-lots/parking-lots.module';
import { VehiclesModule } from './modules/vehiculo/vehicles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    ParkingLotsModule,
    VehiclesModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
