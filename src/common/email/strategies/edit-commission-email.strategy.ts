import { Injectable } from '@nestjs/common';
import { EmailStrategy } from './email-strategy.interface';
import { EmailService } from '../email.service';
import { EmailActions } from '../email-actions.enum';
import { EmailData } from '../email-data.types';

@Injectable()
export class EditCommissionEmailStrategy implements EmailStrategy {
    private readonly templateId = 'SENDGRID_TEMPLATE_ID_FOR_EDIT_COMMISSION'; // Your SendGrid template ID

    constructor(private readonly emailService: EmailService) {}

    async sendEmail(data: EmailData[EmailActions.EditCommission]): Promise<void> {
        // Use the EmailService to send the email with the dynamic data
        await this.emailService.send({
            to: data.recipient, // Dynamic recipient (e.g., agency head)
            templateId: this.templateId,
            dynamicTemplateData: data,
        });
    }
}
