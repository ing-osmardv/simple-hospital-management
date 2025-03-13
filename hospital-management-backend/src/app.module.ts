import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import environmentConfig from './config/environment.config';
import { TypeOrmConfigService } from './config/database.config';
import { PatientModule } from './core/patient/patient.module';
import { DoctorModule } from './core/doctor/doctor.module';
import { AuthModule } from './core/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useClass: TypeOrmConfigService,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [environmentConfig],
    }),
    DoctorModule,
    PatientModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
