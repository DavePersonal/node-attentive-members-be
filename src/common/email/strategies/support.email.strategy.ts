import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { EmailStrategy } from './email-strategy.interface';
import { EmailService } from '../email.service';
import { EmailActions } from '../email-actions.enum';
import { EmailData } from '../email-data.types';
import {EmailSendgridTemplates} from '../email-sendgrid-templates.enum';

@Injectable()
export class SupportEmailStrategy implements EmailStrategy {
    private readonly fixedRecipient = 'support@oakmorelabs.com';
    private readonly templateId = EmailSendgridTemplates.Support;

    constructor(
        @Inject(forwardRef(() => EmailService))
        private readonly emailService: EmailService
    ) {}

    async sendEmail(data: EmailData[EmailActions.NewClient]): Promise<void> {
        await this.emailService.send({
            to: this.fixedRecipient,
            from: {email: `attentivemembers@oakmorelabs.com`, name: `Attentive Members`},
            templateId: this.templateId,
            dynamicTemplateData: data,
        });
    }
}
