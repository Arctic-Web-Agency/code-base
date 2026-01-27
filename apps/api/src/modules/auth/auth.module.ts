import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { UsersModule } from '../users/users.module';
import { TokenModule } from '../token/token.module';
import { MailModule } from '../mail/mail.module';
import { ENV } from '../../config/env';

// Parse expires string like "15m" to seconds
function parseExpiresIn(expiresIn: string): number {
    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (!match) return 900; // Default 15 minutes

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
        case 's':
            return value;
        case 'm':
            return value * 60;
        case 'h':
            return value * 60 * 60;
        case 'd':
            return value * 24 * 60 * 60;
        default:
            return 900;
    }
}

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: ENV.JWT_ACCESS_SECRET,
            signOptions: { expiresIn: parseExpiresIn(ENV.JWT_ACCESS_EXPIRES_IN) },
        }),
        UsersModule,
        TokenModule,
        MailModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        JwtRefreshStrategy,
        ...(ENV.GOOGLE_CLIENT_ID ? [GoogleStrategy] : []),
    ],
    exports: [AuthService],
})
export class AuthModule {}
