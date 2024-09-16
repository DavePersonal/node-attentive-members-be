import {ExtractJwt, Strategy} from 'passport-jwt'
import {PassportStrategy} from '@nestjs/passport'
import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {JwtDto} from './dto/jwt.dto'
import {AUTH_CONSTS} from './auth.consts'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AUTH_CONSTS.secret,
    })
  }

  async validate(payload: any): Promise<JwtDto> {
    if (!payload || !payload.user || !payload.account || !payload.permissions) {
      throw new HttpException('Invalid token payload', HttpStatus.UNAUTHORIZED);
    }
    return {
      user: payload.user,
      account: payload.account,
      permissions: payload.permissions,
    }
  }
}
