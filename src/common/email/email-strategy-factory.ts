import { Injectable } from '@nestjs/common';
import { NewClientEmailStrategy } from './strategies/new-client-email.strategy';
import { EditCommissionEmailStrategy } from './strategies/edit-commission-email.strategy';
import { EmailStrategy } from './strategies/email-strategy.interface';
import { EmailActions } from './email-actions.enum';

@Injectable()
export class EmailStrategyFactory {
    constructor(
        private readonly newClientStrategy: NewClientEmailStrategy,
        private readonly editCommissionStrategy: EditCommissionEmailStrategy,
    ) {}

    getStrategy(action: EmailActions): EmailStrategy {
        switch (action) {
            case EmailActions.NewClient:
                return this.newClientStrategy;
            case EmailActions.EditCommission:
                return this.editCommissionStrategy;
            default:
                throw new Error(`Unknown action: ${action}`);
        }
    }
}
