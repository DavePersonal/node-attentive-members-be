import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Correct import path for PrismaService
import { BaseService } from '../common/base.service';
import { IService } from '../common/interfaces/service.interface';
import { members } from '@prisma/client'; // Import the Prisma model type

@Injectable()
export class MembersService
    extends BaseService<members>
    implements IService<members>
{
    constructor(prismaService: PrismaService) {
        super(prismaService, prismaService.members);
    }

    async findAll(): Promise<members[]> {
        return this.prismaService.members.findMany();
    }

    async findOne(id: number): Promise<members | null> {
        return this.prismaService.members.findUnique({
            where: { id },
        });
    }

    async create(data: members): Promise<members> {
        return this.prismaService.members.create({
            data,
        });
    }

    async update(id: number, data: members): Promise<members> {
        return this.prismaService.members.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<members> {
        return this.prismaService.members.delete({
            where: { id },
        });
    }
}
