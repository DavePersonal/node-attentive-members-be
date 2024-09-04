// src/common/email/email.service.ts

import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as sgMail from '@sendgrid/mail'; // Corrected import path
import { IAccount } from '../../auth/auth.types'; // Corrected import path
import dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class EmailService {
    private sendgridApiKey: string = process.env.SENDGRID_API_KEY || '';
    private domain: string = process.env.DOMAIN || '';
    private protocol: string = process.env.PROTOCOL || 'http';

    private replyEmail = {
        email: `support@oakmorelabs.com`,
        name: `Oakmore Labs Support`,
    };

    constructor() {
        sgMail.setApiKey(this.sendgridApiKey); // Set the API key once in the constructor
    }

    async uploadFileEmail(
        recipient: IAccount,
        filename: string,
        client_name?: string,
        clientId?: number,
    ): Promise<any> {
        const fakeRecipient = {
            firstname: 'Nic',
            surname: '& Ryan',
            email: 'nic@oakmorelabs.com',
        };

        const UPLOAD_FILE_TEMPLATE_ID = 'd-6a134c62e1f14adfb28de87dfcf65dcd';
        const membersEmail = {
            email: `attentivemembers@oakmorelabs.com`,
            name: `Attentive Members`,
        };

        const to = {
            email: fakeRecipient.email,
            name: `${fakeRecipient.firstname} ${fakeRecipient.surname}`,
        };

        const msg = {
            to,
            from: membersEmail,
            templateId: UPLOAD_FILE_TEMPLATE_ID,
            reply_to: this.replyEmail,
            cc: ['ryan@oakmorelabs.com'],
            dynamicTemplateData: {
                firstName: `${fakeRecipient.firstname}`,
                clientName: client_name,
                clientID: clientId,
                newFileName: filename,
            },
        };

        return this.sendEmail(msg);
    }

    async sendClientEmail(
        recipient: { first_name: string; last_name: string; email: string },
        client_name: string,
        client_id: number,
    ): Promise<any> {
        const UPLOAD_FILE_TEMPLATE_ID = 'd-d3b99d269c2149a1b7af36f554aded26';
        const membersEmail = {
            email: `attentivemembers@oakmorelabs.com`,
            name: `Attentive Members`,
        };

        const to = {
            email: recipient.email,
            name: `${recipient.first_name} ${recipient.last_name}`,
        };

        const formUrl = this.createCommissionFormLinkWithHash(
            client_id,
            1,
            recipient.email,
        );

        const msg = {
            to,
            from: membersEmail,
            templateId: UPLOAD_FILE_TEMPLATE_ID,
            reply_to: this.replyEmail,
            dynamicTemplateData: {
                firstName: `${recipient.first_name}`,
                clientName: client_name,
                commissionFormUrl: formUrl,
            },
        };

        return this.sendEmail(msg);
    }

    async sendRequestMoreClientInfoEmail(
        recipient: string,
        client: Client,
    ): Promise<any> {
        const UPLOAD_FILE_TEMPLATE_ID = 'd-d3b99d269c2149a1b7af36f554aded26';
        const copyEmails = ['ryan@oakmorelabs.com', 'nic@oakmorelabs.com'];

        const fakeRecipient = {
            firstname: 'Nic',
            surname: '& Ryan',
            email: 'david@oakmorelabs.com',
        };

        const membersEmail = {
            email: `attentivemembers@oakmorelabs.com`,
            name: `Attentive Members`,
        };

        const to = {
            email: fakeRecipient.email,
            name: `${fakeRecipient.firstname} ${fakeRecipient.surname}`,
        };

        const formUrl = this.createCommissionFormLinkWithHash(
            client.id,
            1,
            recipient,
        );

        const msg = {
            to,
            from: membersEmail,
            cc: copyEmails,
            templateId: UPLOAD_FILE_TEMPLATE_ID,
            reply_to: this.replyEmail,
            dynamicTemplateData: {
                firstName: `${fakeRecipient.firstname}`,
                clientName: client.client_name,
                commissionFormUrl: formUrl,
            },
        };

        return this.sendEmail(msg);
    }

    private async sendEmail(msg: any): Promise<any> {
        try {
            await sgMail.send(msg);
            console.log('Email was successfully sent.');
            return { response: 'Email was successfully sent.' };
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    }

    private createCommissionFormLinkWithHash(
        clientId: number,
        brokerId: number,
        recipientEmail: string,
    ): string {
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 24);

        const hash = this.generateHash({
            clientId,
            brokerId,
            recipientEmail,
            expirationDate,
        });

        return `${this.protocol}://${this.domain}/broker?token=${hash}`;
    }

    private generateHash(dataObjectToHash: any): string {
        const secret = process.env.ENCRYPTION_SECRET ?? 'test-secret';
        const algorithm = 'aes-256-cbc';
        const iv = crypto.randomBytes(16);
        const key = crypto.scryptSync(secret, 'salt', 32);
        const cipher = crypto.createCipheriv(algorithm, key, iv);

        const data = JSON.stringify(dataObjectToHash);

        let encrypted = cipher.update(data, 'utf8', 'base64');
        encrypted += cipher.final('base64');

        const combined = iv.toString('base64') + ':' + encrypted;
        return combined.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
}
