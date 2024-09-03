import { Controller, Get, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ClientsService } from './clients.service';
import { BaseController } from '../common/base.controller';
import { IController } from '../common/interfaces/controller.interface';
import { clients } from '@prisma/client';

@Controller('clients')
export class ClientsController extends BaseController<clients> implements IController<clients> {
    constructor(private readonly clientsService: ClientsService) {
        super(clientsService);
    }

    @Get()
    async findAll(@Req() req: Request, @Res() res: Response): Promise<void> {
        return super.findAll(req, res);
    }

    @Get(':id')
    async findOne(@Req() req: Request, @Res() res: Response): Promise<void> {
        return super.findOne(req, res);
    }

    @Post()
    async create(@Req() req: Request, @Res() res: Response): Promise<void> {
        return super.create(req, res);
    }

    @Put(':id')
    async update(@Req() req: Request, @Res() res: Response): Promise<void> {
        return super.update(req, res);
    }

    @Delete(':id')
    async delete(@Req() req: Request, @Res() res: Response): Promise<void> {
        return super.delete(req, res);
    }
}
