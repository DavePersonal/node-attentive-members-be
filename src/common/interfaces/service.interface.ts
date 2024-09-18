import {PaginatedResult} from '../base.service'
import {IQueryFilter} from '../../shared/decorators/query-filter.decorator'
import {IQueryInclude} from '../../shared/decorators/query-include.decorator'

export interface IService<T> {
    findAll(filter: IQueryFilter, include: IQueryInclude, page: number, size: number): Promise<PaginatedResult<T>>;
    findOne(id: number): Promise<T | null>;
    create(data: T): Promise<T>;
    update(id: number, data: T): Promise<T>;
    delete(id: number): Promise<T>;
}
