import { Request, Response } from 'express';
import { IController } from './interfaces/controller.interface';
import { BaseService } from './base.service';
import { HttpException } from './exceptions/HttpException';
import { Param, Body, Req, Res } from '@nestjs/common';

export class BaseController<T> implements IController<T> {
    constructor(private readonly baseService: BaseService<T>) {}

    async findAll(@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
            const size = req.query.size ? parseInt(req.query.size as string, 10) : undefined;

            const data = await this.baseService.findAll(page, size);
            res.status(200).json(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    async findOne(@Param('id') id: number, @Res() res: Response): Promise<void> {
        try {
            const data = await this.baseService.findOne(id);
            if (data) {
                res.status(200).json(data);
            } else {
                throw new HttpException(404, `Resource with ID ${id} not found.`);
            }
        } catch (error) {
            this.handleException(error, res);
        }
    }

    async create(@Body() data: T, @Res() res: Response): Promise<void> {
        try {
            const createdData = await this.baseService.create(data);
            res.status(201).json(createdData);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    async update(@Param('id') id: number, @Body() data: T, @Res() res: Response): Promise<void> {
        try {
            const updatedData = await this.baseService.update(id, data);
            if (updatedData) {
                res.status(200).json(updatedData);
            } else {
                throw new HttpException(404, `Resource with ID ${id} not found for update.`);
            }
        } catch (error) {
            this.handleException(error, res);
        }
    }

    async delete(@Param('id') id: number, @Res() res: Response): Promise<void> {
        try {
            const result = await this.baseService.delete(id);
            if (result) {
                res.status(204).send();
            } else {
                throw new HttpException(404, `Resource with ID ${id} not found for deletion.`);
            }
        } catch (error) {
            this.handleException(error, res);
        }
    }

    protected handleException(error: any, res: Response): void {
        if (error instanceof HttpException) {
            res.status(error.status || 500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }
}
