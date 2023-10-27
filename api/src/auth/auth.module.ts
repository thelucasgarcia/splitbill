import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';
import { LoginAuth } from 'src/app/use-cases/auth/login.auth';
import { RegisterAuth } from 'src/app/use-cases/auth/register.auth';
import { FindOneUser } from 'src/app/use-cases/user/find-one-user';
import { ValidUsername } from 'src/app/use-cases/auth/attemp.auth';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET,
      publicKey: process.env.JWT_REFRESH_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshStrategy,
    LoginAuth,
    RegisterAuth,
    FindOneUser,
    ValidUsername,
  ],
})
export class AuthModule {}
