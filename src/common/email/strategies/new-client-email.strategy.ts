import { Injectable } from '@nestjs/common';
import { EmailStrategy } from './email-strategy.interface';
import { EmailService } from '../email.service';
import { EmailActions } from '../email-actions.enum';
import { EmailData } from '../email-data.types';

@Injectable()
export class NewClientEmailStrategy implements EmailStrategy {
    private readonly fixedRecipient = 'xyz@example.com'; // Fixed email address
    private readonly templateId = 'SENDGRID_TEMPLATE_ID_FOR_NEW_CLIENT'; // Your SendGrid template ID

    constructor(private readonly emailService: EmailService) {}

    async sendEmail(data: EmailData[EmailActions.NewClient]): Promise<void> {
        // Use the EmailService to send the email with the dynamic data
        await this.emailService.send({
            to: this.fixedRecipient,
            templateId: this.templateId,
            dynamicTemplateData: data,
        });
    }
}
