import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ENV } from '../../../config/env';
import { UsersService } from '../../users/users.service';

export interface JwtRefreshPayload {
    sub: string;
    email: string;
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    return req?.cookies?.refreshToken || null;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: ENV.JWT_REFRESH_SECRET,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: JwtRefreshPayload) {
        const refreshToken = req?.cookies?.refreshToken;

        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token not found');
        }

        const user = await this.usersService.findByIdWithRefreshToken(
            payload.sub,
        );

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return {
            id: user._id.toString(),
            email: user.email,
            refreshToken,
            refreshTokenHash: user.refreshTokenHash,
        };
    }
}
