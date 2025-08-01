export interface ISendEmail {
  from: string;
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  template?: string;
  context?: Record<string, any>;
}

export interface EmailRepository {
  sendEmail(data: ISendEmail): Promise<void>;
}
