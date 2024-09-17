import {Module} from '@nestjs/common'
import {MembersService} from './members.service'
import {MembersController} from './members.controller'
import {GoogleService} from '../common/google/google.service'
import {EmailService} from '../common/email/email.service'
import {GoogleDataAccess} from '../common/google/google.data-access'
import {EmailModule} from '../common/email/email.module'
import {MulterModule} from '@nestjs/platform-express'
import * as multer from 'multer'

@Module({
    providers: [MembersService, GoogleService, EmailService, GoogleDataAccess],
    controllers: [MembersController],
    imports: [
        EmailModule,
        MulterModule.register({
            storage: multer.memoryStorage(),
        }),
    ],

})
export class MembersModule {
}
