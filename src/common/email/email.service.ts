import { Injectable } from '@nestjs/common';
import { EmailStrategyFactory } from './email-strategy-factory';
import sgMail from '@sendgrid/mail';
import { EmailActions } from './email-actions.enum';
import { EmailData } from './email-data.types';

@Injectable()
export class EmailService {
    constructor(private readonly strategyFactory: EmailStrategyFactory) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set SendGrid API key
    }

    async sendEmail<T extends EmailActions>(
        action: T,
        data: EmailData[T], // Enforce that the data matches the required type for the given action
    ): Promise<void> {
        const strategy = this.strategyFactory.getStrategy(action);
        await strategy.sendEmail(data);
    }

    async send(options: { to: string; templateId: string; dynamicTemplateData: any }): Promise<void> {
        try {
            const msg = {
                to: options.to,
                from: 'noreply@yourdomain.com', // Your verified sender
                templateId: options.templateId,
                dynamicTemplateData: options.dynamicTemplateData,
            };

            await sgMail.send(msg);
            console.log(`Email sent to ${options.to}`);
        } catch (error) {
            console.error(`Failed to send email: ${error.message}`);
        }
    }
}
