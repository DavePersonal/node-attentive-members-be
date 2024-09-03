import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule } from './clients/clients.module';
import { AccountManagersModule } from './account-managers/account-managers.module';
import { BrokersModule } from './brokers/brokers.module';
import { ClientsToBrokersModule } from './clients_to_brokers/clients_to_brokers.module';
import { ClientsToBrokersExternalModule } from './clients_to_brokers_external/clients_to_brokers_external.module';
import { InvoiceDraftModule } from './invoice-draft/invoice-draft.module';
import { InvoiceFinalModule } from './invoice-final/invoice-final.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [PrismaModule, ClientsModule, AccountManagersModule, BrokersModule, ClientsToBrokersModule, ClientsToBrokersExternalModule, InvoiceDraftModule, InvoiceFinalModule, MembersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
