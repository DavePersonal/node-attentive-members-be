import {IQueryFilter} from '../../shared/decorators/query-filter.decorator'
import {PaginatedResult} from '../base.service'
import {IQueryInclude} from '../../shared/decorators/query-include.decorator'

export interface IController<T> {
    findAll(filter?: IQueryFilter,include?: IQueryInclude, page?: number, size?: number): Promise<PaginatedResult<T>>;
    findOne(id: number): Promise<T>;
    create(data: T): Promise<T>;
    update(id: number, data: T): Promise<T>;
    delete(id: number): Promise<{success:boolean}>;
}
