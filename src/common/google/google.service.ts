import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { GoogleDataAccess } from './google.data-access';
import {IGoogleFile, IUploadFile} from '../interfaces/file.types';

@Injectable()
export class GoogleService {
    constructor(private readonly googleDataAccess: GoogleDataAccess) {}

    async upload(files: IUploadFile[], userId: string): Promise<IGoogleFile[]> {
        const created = await Promise.all(
            files.map(async (file) => {
                const metadata = {
                    resource: {
                        name: file.originalname,
                        parents: [this.googleDataAccess.targetFolderId], // Access the target folder ID from GoogleDataAccess
                        appProperties: {
                            userId: userId,
                        },
                        fields: 'id name createdTime webViewLink',
                    },
                    media: {
                        mimeType: file.mimetype,
                        body: Readable.from(file.buffer),
                    },
                    uploadType: 'multipart',
                };
                return this.googleDataAccess.createFile(metadata);
            }),
        );

        return Promise.all(created.map(async (i) => this.googleDataAccess.getFile(i.id)));
    }

    findFile(id: string): Promise<any> {
        return this.googleDataAccess.getFile(id);
    }

    removeFile(id: string): Promise<any> {
        return this.googleDataAccess.removeFile(id);
    }

    async copyFile(file: any, targetFolderId: string): Promise<any> {
        const fileMetadata = {
            name: file.name,
            parents: [targetFolderId],
            fields: 'id name createdTime webViewLink',
        };
        return this.googleDataAccess.copyFile(file, fileMetadata);
    }

    async downloadFile(fileId: string): Promise<any> {
        return this.googleDataAccess.downloadFile(fileId);
    }
}
