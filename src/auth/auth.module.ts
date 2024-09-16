import {Module} from '@nestjs/common'
import {AuthService} from './auth.service'
import {AuthController} from './auth.controller'
import {JwtStrategy} from './jwt.strategy'
import {PassportModule} from '@nestjs/passport'
import {JwtModule} from '@nestjs/jwt'
import {AUTH_CONSTS} from './auth.consts'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: AUTH_CONSTS.secret,
      signOptions: {expiresIn: '180000s'}
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {
}
