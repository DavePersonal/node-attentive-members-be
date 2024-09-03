export interface IService<T> {
    findAll(): Promise<T[]>;
    findOne(id: number): Promise<T | null>;
    create(data: T): Promise<T>;
    update(id: number, data: T): Promise<T>;
    delete(id: number): Promise<T>;
}
