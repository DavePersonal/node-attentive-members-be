import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body, ParseIntPipe, UploadedFiles, UseInterceptors, UseGuards,
} from '@nestjs/common'
import {MembersService} from './members.service'
import {BaseController} from '../common/base.controller'
import {IController} from '../common/interfaces/controller.interface'
import {members} from '@prisma/client'
import {IQueryFilter, QueryFilter} from '../shared/decorators/query-filter.decorator'
import {QueryPage} from '../shared/decorators/query-page.decorator'
import {QuerySize} from '../shared/decorators/query-limit.decorator'
import {PaginatedResult} from '../common/base.service'
import {FilesInterceptor} from '@nestjs/platform-express'
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard'
import {SignedUser} from '../shared/decorators/user.decorator'
import {JwtDto} from '../auth/dto/jwt.dto'


@Controller('members')
export class MembersController   extends BaseController<members>
    implements IController<members> {
    constructor(private readonly membersService: MembersService) {
        super(membersService)
    }

    @Get()
    async findAll(@QueryFilter() filter: IQueryFilter, @QueryPage() page: number, @QuerySize() size: number): Promise<PaginatedResult<members>> {
        return super.findAll(filter, page, size)
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<members> {
        return super.findOne(id)
    }

    @Post()
    async create(@Body() data: members): Promise<members> {
        return super.create(data)
    }

    @Post('upload')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files', 10))
    async uploadFilesAndImportMembers(@UploadedFiles() files: Express.Multer.File[], @Body() body: any, @SignedUser() userData: JwtDto): Promise<members[]> {
        const account = userData.account
        const client_name = body.client_name === 'undefined' ? undefined : body.client_name
        const client_id = body.client_id === 'undefined' ? undefined : body.client_id
        return this.membersService.uploadFilesAndImportMembers(files, account, client_name, client_id)
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data: members,
    ): Promise<members> {
        return super.update(id, data)
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<{success: boolean}> {
        return super.delete(id)
    }


}
