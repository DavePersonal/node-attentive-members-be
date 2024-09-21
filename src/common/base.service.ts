import {PrismaService} from '../prisma/prisma.service'
import {IService} from './interfaces/service.interface'
import {IQueryFilter} from '../shared/decorators/query-filter.decorator'
import {IQueryInclude} from '../shared/decorators/query-include.decorator'

export interface PaginatedResult<T> {
    records: T[]
    count: number;
}

export class BaseService<T> implements IService<T> {
    constructor(
        protected readonly prismaService: PrismaService,
        private readonly modelDelegate: {
            findMany: (args?: {
                where?: IQueryFilter,
                skip?: number;
                take?: number,
                include?: IQueryInclude
            }) => Promise<T[]>;
            findFirst: (args?: {where?: IQueryFilter,include?: IQueryInclude}) => Promise<T>,
            findUnique: (args: {where: {id: number}}) => Promise<T|null>;
            create: (args: {data: T}) => Promise<T>;
            update: (args: {where: {id: number}; data: T}) => Promise<T>;
            delete: (args: {where: {id: number}}) => Promise<T>;
            count: (args?: {where?: {[key: string]: any}}) => Promise<number>;
        },
    ) {
    }

    async findAll(filter?: IQueryFilter, include?: IQueryInclude, page?: number, size?: number): Promise<PaginatedResult<T>> {
        let skip: number|undefined
        let take: number|undefined

        if (page !== undefined && size !== undefined) {
            skip = page * size
            take = size
        }

        include = include || {}

        const records = await this.modelDelegate.findMany({where: filter, skip, take, include})
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

    findFirst(filter: IQueryFilter, include?: IQueryInclude): Promise<T> {
        include = include || {}
        filter = filter || {}
        return this.modelDelegate.findFirst({where: filter, include})
    }
}
