import { Inject, Injectable } from '@nestjs/common';
import { EmailRepository, ISendEmail } from 'src/context/notifications/domain';

@Injectable()
export class EmailUseCase {
  constructor(
    @Inject('EmailRepository')
    private readonly email: EmailRepository,
  ) {}

  execute(data: ISendEmail) {
    return this.email.sendEmail(data);
  }
}
