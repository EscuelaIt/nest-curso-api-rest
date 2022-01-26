import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from 'src/common/roles.guard';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshToken } from './entities/refresh-token.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { TokenService } from './token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt')['jwt_secret'],
        signOptions: {
          expiresIn: configService.get<string>('jwt')['jwt_access_expiresin'],
        },
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, TokenService, RolesGuard]
})
export class AuthModule {}
