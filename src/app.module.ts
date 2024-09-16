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
import { GoogleModule } from './common/google/google.module';
import { AuthModule } from './auth/auth.module';
import { AgenciesController } from './agencies/agencies.controller';
import { AgenciesService } from './agencies/agencies.service';
import { BrokersToAgenciesService } from './brokers_to_agencies/brokers_to_agencies.service';
import { BrokersToAgenciesController } from './brokers_to_agencies/brokers_to_agencies.controller';
import { AgenciesModule } from './agencies/agencies.module';
import { BrokersToAgenciesModule } from './brokers_to_agencies/brokers_to_agencies.module';

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
      envFilePath: '.env',
      isGlobal: true
    }),
    GoogleModule,
    AuthModule,
    AgenciesModule,
    BrokersToAgenciesModule,
  ],
  controllers: [AppController, AgenciesController, BrokersToAgenciesController],
  providers: [AppService, AgenciesService, BrokersToAgenciesService],
})
export class AppModule {}
