import { Module } from '@nestjs/common';
import { AuthModule } from './context/auth/auth.module';
import { UserModule } from './context/user/user.module';
import { AuditModule } from './context/audit/audit.module';

@Module({
  imports: [AuthModule, UserModule, AuditModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
