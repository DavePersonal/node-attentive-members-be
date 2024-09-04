import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Req,
    Res,
    Param,
    Body,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MembersService } from './members.service';
import { BaseController } from '../common/base.controller';
import { IController } from '../common/interfaces/controller.interface';
import { members } from '@prisma/client';

@Controller('members')
export class MembersController
    extends BaseController<members>
    implements IController<members>
{
    constructor(private readonly membersService: MembersService) {
        super(membersService);
    }

    @Get()
    async findAll(@Req() req: Request, @Res() res: Response): Promise<void> {
        return super.findAll(req, res);
    }

    @Get(':id')
    async findOne(@Param('id') id: number, @Res() res: Response): Promise<void> {
        return super.findOne(id, res);
    }

    @Post()
    async create(@Body() data: members, @Res() res: Response): Promise<void> {
        return super.create(data, res);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data: members,
        @Res() res: Response,
    ): Promise<void> {
        return super.update(id, data, res);
    }

    @Delete(':id')
    async delete(@Param('id') id: number, @Res() res: Response): Promise<void> {
        return super.delete(id, res);
    }
}
