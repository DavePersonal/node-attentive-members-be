import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { EmailStrategyFactory } from './email-strategy-factory';
import * as sgMail from '@sendgrid/mail';
import { EmailActions } from './email-actions.enum';
import { EmailData } from './email-data.types';
import * as jwt from 'jsonwebtoken';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class EmailService {
    constructor(private readonly strategyFactory: EmailStrategyFactory, private configService: ConfigService) {
        sgMail.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
    }

    async sendEmail<T extends EmailActions>(
        action: T,
        data: EmailData[T],
    ): Promise<void> {
        const strategy = this.strategyFactory.getStrategy(action);
        await strategy.sendEmail(data);
    }

    async send(options: { to: string; from: {email: string, name: string}, templateId: string; dynamicTemplateData: any }): Promise<void> {
        try {
            const msg = {
                to: options.to,
                from: options.from,
                templateId: options.templateId,
                dynamicTemplateData: options.dynamicTemplateData,
            };

            await sgMail.send(msg);
        } catch (error) {
            throw new HttpException(
                'Could not send email.',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    createJwtToken(data: any): string {
        const secret = this.configService.get<string>('JWT_SECRET');
        return jwt.sign(data, secret, { expiresIn: '24h' });
    }
}
