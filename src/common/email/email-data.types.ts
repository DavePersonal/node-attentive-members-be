import { EmailActions } from './email-actions.enum';

export type EmailData = {
    [EmailActions.NewClient]: {
        firstName: string;
        clientName: string;
        commissionFormUrl: string;
    };
    [EmailActions.EditCommission]: {
        recipient: string;
        brokerName: string;
        updatedBy: string;
        updateDate: string;
    };
    [EmailActions.UploadFile]: {
        firstName: string;
        clientName: string;
        clientID: number;
        newFileName: string;
    }
    [EmailActions.Support]: {
        email_subject: string;
        email_data: string;
    }
};
