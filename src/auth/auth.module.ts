import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';

import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { jwtSecret } from './constants';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: {expiresIn: '3600s'}
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, LocalStrategy, AuthResolver],
  exports: [AuthService]
})
export class AuthModule {}
