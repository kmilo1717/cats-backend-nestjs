import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * JWT authentication strategy.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  /**
   * Constructor for JwtStrategy.
   */
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret',
    });
  }

  /**
   * Validate the JWT payload.
   * @param payload - The JWT payload.
   * @returns The user information.
   */
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
