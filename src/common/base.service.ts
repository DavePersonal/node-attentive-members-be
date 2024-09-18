import {PrismaService} from '../prisma/prisma.service'
import {IService} from './interfaces/service.interface'
import {IQueryFilter} from '../shared/decorators/query-filter.decorator'

export interface PaginatedResult<T> {
    records: T[]
    count: number;
}

export class BaseService<T> implements IService<T> {
    constructor(
        protected readonly prismaService: PrismaService,
        private readonly modelDelegate: {
            findMany: (args?: {where?: {[key: string]: any}, skip?: number; take?: number}) => Promise<T[]>;
            findUnique: (args: {where: {id: number}}) => Promise<T|null>;
            create: (args: {data: T}) => Promise<T>;
            update: (args: {where: {id: number}; data: T}) => Promise<T>;
            delete: (args: {where: {id: number}}) => Promise<T>;
            count: (args?: {where?: {[key: string]: any}}) => Promise<number>;
        },
    ) {
    }

    async findAll(filter?: IQueryFilter, page?: number, size?: number): Promise<PaginatedResult<T>> {
        const skip = page * size;
        const take = size

        const records = await this.modelDelegate.findMany({where: filter, skip, take})
        const count = await this.modelDelegate.count({where: filter})

        return {records, count}
    }

    async findOne(id: number): Promise<T|null> {
        return this.modelDelegate.findUnique({
            where: {id},
        })
    }

    async create(data: T): Promise<T> {
        return this.modelDelegate.create({
            data,
        })
    }

    async update(id: number, data: T): Promise<T> {
        return this.modelDelegate.update({
            where: {id},
            data,
        })
    }

    async delete(id: number): Promise<T> {
        return this.modelDelegate.delete({
            where: {id},
        })
    }
}
