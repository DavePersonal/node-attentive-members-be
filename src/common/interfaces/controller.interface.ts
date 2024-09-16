import { Request } from 'express';
import {IQueryFilter} from '../../shared/decorators/query-filter.decorator'

export interface IController<T> {
    findAll(req: Request): Promise<T[]>;
    // findAll(filter: IQueryFilter, page: number, size: number): Promise<T[]>;
    findOne(id: number): Promise<T>;
    create(data: T): Promise<T>;
    update(id: number, data: T): Promise<T>;
    delete(id: number): Promise<void>;
}
