import { Injectable } from '@nestjs/common';
import { NewClientEmailStrategy } from './strategies/new-client-email.strategy';
import { EditCommissionEmailStrategy } from './strategies/edit-commission-email.strategy';
import { EmailStrategy } from './strategies/email-strategy.interface';
import { EmailActions } from './email-actions.enum';
import {UploadFileEmailStrategy} from './strategies/upload-file-email.strategy';

@Injectable()
export class EmailStrategyFactory {
    constructor(
        private readonly newClientStrategy: NewClientEmailStrategy,
        private readonly editCommissionStrategy: EditCommissionEmailStrategy,
        private readonly uploadFileStrategy: UploadFileEmailStrategy,
    ) {}

    getStrategy(action: EmailActions): EmailStrategy {
        switch (action) {
            case EmailActions.NewClient:
                return this.newClientStrategy;
            case EmailActions.EditCommission:
                return this.editCommissionStrategy;
            case EmailActions.UploadFile:
                return this.uploadFileStrategy;
            default:
                throw new Error(`Unknown action: ${action}`);
        }
    }
}
