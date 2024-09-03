import { Request, Response } from 'express';

export interface IController<T> {
    findAll(req: Request, res: Response): Promise<void>;
    findOne(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
