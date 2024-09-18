import {Injectable} from '@nestjs/common'
import {PrismaService} from '../prisma/prisma.service' // Correct import path for PrismaService
import {BaseService, PaginatedResult} from '../common/base.service'
import {IService} from '../common/interfaces/service.interface'
import {members} from '@prisma/client'
import {IQueryFilter} from '../shared/decorators/query-filter.decorator'
import {IAccount} from '../auth/auth.types'
import {MemberStatus} from './member.types'
import {GoogleService} from '../common/google/google.service'
import {EmailService} from '../common/email/email.service'
import {EmailActions} from '../common/email/email-actions.enum'
import {FileUtils} from '../file/file.utils'
import {IQueryInclude} from '../shared/decorators/query-include.decorator' // Import the Prisma model type

@Injectable()
export class MembersService extends BaseService<members> implements IService<members> {

    constructor(
        prismaService: PrismaService,
        private googleService: GoogleService,
        private emailService: EmailService
    ) {
        super(prismaService, prismaService.members);
    }

    async findAll(filter?: IQueryFilter, include?: IQueryInclude,  page?: number, size?: number): Promise<PaginatedResult<members>> {
        return super.findAll(filter, include, page, size);
    }

    async findOne(id: number): Promise<members | null> {
        return super.findOne(id);
    }

    async create(data: members): Promise<members> {
        return super.create(data);
    }

    async update(id: number, data: members): Promise<members> {
        return super.update(id, data);
    }

    async delete(id: number): Promise<members> {
        return super.delete(id);
    }

    async uploadFilesAndImportMembers(files: any[], account: IAccount, client_name?: string, client_id?: number): Promise<members[]> {
        const fileUtils = new FileUtils()
        let membersToCreate: any[] = await fileUtils.getMembersDataFromFile(files[0])

        await this.googleService.upload(files, account?._id?.toString())
        await this.emailService.sendEmail(EmailActions.UploadFile, {
            firstName: account?.firstname,
            newFileName: files[0].originalname,
            clientID: client_id || null,
            clientName: client_name || '',
        })

        files = files.map(() => null)

        if (!membersToCreate?.length) {
            return []
        }

        membersToCreate = membersToCreate.map(member => ({
            ...member,
            client_name: client_name || null,
            client_id: Number(client_id) || null,
            member_status: MemberStatus.ACTIVE,
            phone_num: String(member.phone_num),
            other_phone: String(member.other_phone),
            zip_code: String(member.zip_code),
        }))

        return this.prismaService.members.createManyAndReturn({
            data: membersToCreate,
            skipDuplicates: true
        })
    }
}
