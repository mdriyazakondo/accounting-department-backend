interface EmailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string;
}
declare class EmailService {
    private transporter;
    constructor();
    sendEmail(options: EmailOptions): Promise<void>;
    sendOTP(email: string, otp: string): Promise<void>;
}
declare const _default: EmailService;
export default _default;
//# sourceMappingURL=emailService.d.ts.map