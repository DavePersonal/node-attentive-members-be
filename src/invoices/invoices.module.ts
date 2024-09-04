import { Module } from '@nestjs/common';
import { InvoicesDraftService } from './invoices-draft/invoices-draft.service';
import { InvoicesFinalService } from './invoices-final/invoices-final.service';
import { InvoicesFinalController } from './invoices-final/invoices-final.controller';
import { InvoicesDraftController } from './invoices-draft/invoices-draft.controller';

@Module({
  providers: [InvoicesDraftService, InvoicesFinalService],
  controllers: [InvoicesFinalController, InvoicesDraftController]
})
export class InvoicesModule {}
