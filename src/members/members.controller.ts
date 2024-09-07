import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Req,
    Param,
    Body,
} from '@nestjs/common';
import { Request } from 'express';
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
    async findAll(@Req() req: Request): Promise<members[]> {
        return super.findAll(req);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<members> {
        return super.findOne(id);
    }

    @Post()
    async create(@Body() data: members): Promise<members> {
        return super.create(data);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data: members
    ): Promise<members> {
        return super.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return super.delete(id);
    }
}
