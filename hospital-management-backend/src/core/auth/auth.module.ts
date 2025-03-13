import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'mySuperSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
