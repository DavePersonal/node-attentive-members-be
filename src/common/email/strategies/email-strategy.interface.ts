export interface EmailStrategy {
    sendEmail(data: any): Promise<void>;
}
