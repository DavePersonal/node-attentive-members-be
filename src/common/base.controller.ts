import { Request, Response } from 'express';
import { IController } from './interfaces/controller.interface';
import { BaseService } from './base.service';

export class BaseController<T> implements IController<T> {
    constructor(private readonly baseService: BaseService<T>) {}

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            // Parse pagination parameters
            const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
            const size = req.query.size ? parseInt(req.query.size as string, 10) : undefined;

            // Pass parsed pagination parameters to the service
            const data = await this.baseService.findAll(page, size);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findOne(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const data = await this.baseService.findOne(+id);
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.baseService.create(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const data = await this.baseService.update(+id, req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.baseService.delete(+id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
