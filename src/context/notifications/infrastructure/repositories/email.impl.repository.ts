import { MailProvider } from '../providers/email.provider';
import { EmailRepository, ISendEmail } from '../../domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailImplRepository implements EmailRepository {
  constructor(private readonly emailProvider: MailProvider) {}

  sendEmail(data: ISendEmail): Promise<void> {
    return this.emailProvider.sendEmail(data);
  }
}
