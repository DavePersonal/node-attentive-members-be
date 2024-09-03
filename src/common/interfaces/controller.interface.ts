import { Request, Response } from 'express';

export interface IController<T> {
    findAll(req: Request, res: Response): Promise<void>;
    findOne(id: number, res: Response): Promise<void>;
    create(data: T, res: Response): Promise<void>;
    update(id: number, data: T, res: Response): Promise<void>;
    delete(id: number, res: Response): Promise<void>;
}
