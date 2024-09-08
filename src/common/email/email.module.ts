import { Module, Global } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailStrategyFactory } from './email-strategy-factory';
import { NewClientEmailStrategy } from './strategies/new-client-email.strategy';
import { EditCommissionEmailStrategy } from './strategies/edit-commission-email.strategy';
import {UploadFileEmailStrategy} from './strategies/upload-file-email.strategy';

@Global()
@Module({
    providers: [
        EmailService,
        EmailStrategyFactory,
        UploadFileEmailStrategy,
        NewClientEmailStrategy,
        EditCommissionEmailStrategy,
    ],
    exports: [EmailService],
})
export class EmailModule {}
