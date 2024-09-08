import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { EmailStrategy } from './email-strategy.interface';
import { EmailService } from '../email.service';
import { EmailActions } from '../email-actions.enum';
import { EmailData } from '../email-data.types';
import {EmailSendgridTemplates} from '../email-sendgrid-templates.enum';

@Injectable()
export class NewClientEmailStrategy implements EmailStrategy {
    private readonly fixedRecipient = 'david@oakmorelabs.com';
    private readonly templateId = EmailSendgridTemplates.NewClient;

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
