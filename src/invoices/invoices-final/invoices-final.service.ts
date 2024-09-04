import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Correct import path for PrismaService
import { BaseService } from '../../common/base.service';
import { IService } from '../../common/interfaces/service.interface';
import { invoices_final } from '@prisma/client'; // Import the Prisma model type

@Injectable()
export class InvoicesFinalService
    extends BaseService<invoices_final>
    implements IService<invoices_final>
{
    constructor(prismaService: PrismaService) {
        super(prismaService, prismaService.invoices_final);
    }

    async findAll(): Promise<invoices_final[]> {
        return this.prismaService.invoices_final.findMany();
    }

    async findOne(id: number): Promise<invoices_final | null> {
        return this.prismaService.invoices_final.findUnique({
            where: { id },
        });
    }

    async create(data: invoices_final): Promise<invoices_final> {
        return this.prismaService.invoices_final.create({
            data,
        });
    }

    async update(id: number, data: invoices_final): Promise<invoices_final> {
        return this.prismaService.invoices_final.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<invoices_final> {
        return this.prismaService.invoices_final.delete({
            where: { id },
        });
    }
}
