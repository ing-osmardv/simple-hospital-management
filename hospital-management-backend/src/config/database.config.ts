import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { validateAppConfiguration } from './environment.config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

  public constructor(private readonly _configService: ConfigService) {}
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const appEnvironemts = validateAppConfiguration();

    const connection: MysqlConnectionOptions = {
      type: 'mysql',
      host: appEnvironemts.DatabaseHost,
      port: parseInt(appEnvironemts.DatabasePort, 10) || 3306,
      username: appEnvironemts.DatabaseUser,
      password: appEnvironemts.DatabasePassword,
      database: appEnvironemts.DatabaseName,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    }

    return {
      ...connection,
      autoLoadEntities: true,
      synchronize: false,
      migrations: [
        'dist/src/database/migrations/*{.ts,.js}',
      ],
      cache: {
        duration: 1 * 1000,
        alwaysEnabled: true,
      },
    };
  }
}
