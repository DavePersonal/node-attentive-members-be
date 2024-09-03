import { PrismaService } from '../prisma/prisma.service';
import { IService } from './interfaces/service.interface';

export class BaseService<T> implements IService<T> {
    constructor(
        protected readonly prismaService: PrismaService,
        private readonly modelDelegate: {
            findMany: (args?: { skip?: number; take?: number }) => Promise<T[]>;
            findUnique: (args: { where: { id: number } }) => Promise<T | null>;
            create: (args: { data: T }) => Promise<T>;
            update: (args: { where: { id: number }; data: T }) => Promise<T>;
            delete: (args: { where: { id: number } }) => Promise<T>;
        }
    ) {}

    async findAll(page?: number, size?: number): Promise<T[]> {
        if (page && size) {
            const skip = (page - 1) * size;
            const take = size;
            return this.modelDelegate.findMany({ skip, take });
        }

        // Fetch all records if no pagination parameters are provided
        return this.modelDelegate.findMany();
    }

    async findOne(id: number): Promise<T | null> {
        return this.modelDelegate.findUnique({
            where: { id },
        });
    }

    async create(data: T): Promise<T> {
        return this.modelDelegate.create({
            data,
        });
    }

    async update(id: number, data: T): Promise<T> {
        return this.modelDelegate.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<T> {
        return this.modelDelegate.delete({
            where: { id },
        });
    }
}
