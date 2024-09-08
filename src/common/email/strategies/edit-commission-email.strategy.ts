import { Injectable } from '@nestjs/common';
import { EmailStrategy } from './email-strategy.interface';
import { EmailService } from '../email.service';
import { EmailActions } from '../email-actions.enum';
import { EmailData } from '../email-data.types';
import {EmailSendgridTemplates} from '../email-sendgrid-templates.enum';

@Injectable()
export class EditCommissionEmailStrategy implements EmailStrategy {
    private readonly templateId = EmailSendgridTemplates.EditCommission;

    constructor(private readonly emailService: EmailService) {}

    async sendEmail(data: EmailData[EmailActions.EditCommission]): Promise<void> {
        await this.emailService.send({
            to: data.recipient,
            from: {email: `attentivemembers@oakmorelabs.com`, name: `Attentive Members`},
            templateId: this.templateId,
            dynamicTemplateData: data,
        });
    }
}
