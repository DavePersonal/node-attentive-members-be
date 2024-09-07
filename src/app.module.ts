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
import {ConfigModule} from '@nestjs/config';
import {EmailModule} from './common/email/email.module';

@Module({
  imports: [
    PrismaModule,
    ClientsModule,
    BrokersModule,
    ClientsToBrokersModule,
    ClientsToBrokersExternalModule,
    MembersModule,
    InvoicesModule,
    EmailModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
