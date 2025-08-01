import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/shared/config/config.module';
import { EmailImplRepository } from './infrastructure/repositories/email.impl.repository';
import { EmailUseCase } from './application/usecases/email/email.usecase';
import { MailProvider } from './infrastructure/providers/email.provider';

@Module({
  imports: [AppConfigModule],
  providers: [
    EmailUseCase,
    {
      provide: 'EmailRepository',
      useClass: EmailImplRepository,
    },
    EmailImplRepository,
    MailProvider,
  ],
  exports: ['EmailRepository', EmailUseCase, EmailImplRepository, MailProvider],
})
export class NotificationsModule {}
