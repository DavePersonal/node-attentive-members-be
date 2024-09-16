import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common'
import {AuthService} from './auth.service'
import {LoginDto} from './dto/login.dto'
import {JwtAuthGuard} from './guards/jwt-auth.guard'
import {JwtDto} from './dto/jwt.dto'
import {SignedUser} from '../shared/decorators/user.decorator'
import {LoginResponseDto} from './dto/login-response.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto)
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async fetchMe(@SignedUser() userData: JwtDto): Promise<JwtDto> {
    return userData
  }
}
