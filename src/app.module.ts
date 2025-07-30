import { Module } from '@nestjs/common';
import { AuditModule } from './context/audit/audit.module';
import { AuthModule } from './context/auth/auth.module';
import { UserModule } from './context/user/user.module';
import { AppConfigModule } from './shared/config/config.module';
import { NotificationsModule } from './context/notifications/notifications.module';

@Module({
  imports: [AuthModule, UserModule, AuditModule, AppConfigModule, NotificationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
