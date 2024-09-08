import {Controller, Get, Post} from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor() {}

    @Post('login')
    async login() {

    }

    @Get('me')
    async fetchMe() {

    }
}
