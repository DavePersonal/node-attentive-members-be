import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule } from './clients/clients.module';
import { BrokersModule } from './brokers/brokers.module';
import { ClientsToBrokersModule } from './clients_to_brokers/clients_to_brokers.module';
import { ClientsToBrokersExternalModule } from './clients_to_brokers_external/clients_to_brokers_external.module';
import { MembersModule } from './members/members.module';
import { InvoicesModule } from './invoices/invoices.module';
import { EmailService } from './common/email/email.service';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    ClientsModule,
    BrokersModule,
    ClientsToBrokersModule,
    ClientsToBrokersExternalModule,
    MembersModule,
    InvoicesModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
