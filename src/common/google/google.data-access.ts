import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';
import {IGoogleFile} from '../interfaces/file.types';

@Injectable()
export class GoogleDataAccess {
    private drive: any;
    private sheets: any;
    public targetFolderId: string;

    constructor(private configService: ConfigService) {
        const googleDriveServiceAccountEmail = this.configService.get<string>('GOOGLE_CLIENT_EMAIL');
        const googleDrivePrivateKey = this.configService
            .get<string>('GOOGLE_PRIVATE_KEY')
            .replace(/\\n/g, '\n'); // Handle newlines in private key
        this.targetFolderId = this.configService.get<string>('GOOGLE_DRIVE_TARGET_FOLDER_ID');

        const scopes = [
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/drive.appdata',
            'https://www.googleapis.com/auth/docs',
            'https://www.googleapis.com/auth/spreadsheets',
        ];

        try {
            const auth = new google.auth.JWT(googleDriveServiceAccountEmail, null, googleDrivePrivateKey, scopes);
            this.drive = google.drive({ version: 'v3', auth });
            this.sheets = google.sheets({ version: 'v4', auth });
            console.log('Successfully authenticated to Google Drive');
        } catch (e) {
            throw new HttpException('Cannot authenticate to Google Drive', HttpStatus.BAD_REQUEST);
        }
    }

    async getFile(id: string): Promise<IGoogleFile> {
        try {
            const { data } = await this.drive.files.get({
                fileId: id,
                fields: 'name, webViewLink, id, mimeType, iconLink, createdTime, modifiedTime, appProperties',
            });

            if (!data) {
                throw new HttpException('No file found with this ID', HttpStatus.NOT_FOUND);
            }
            return data;
        } catch (e) {
            throw new HttpException('Cannot fetch file from Google Drive', HttpStatus.BAD_REQUEST);
        }
    }

    async listMemberFilesByUserId(userId: string): Promise<IGoogleFile[]> {
        try {
            const query = `appProperties has { key='userId' and value='${userId}' } and '${this.targetFolderId}' in parents`;
            const { data } = await this.drive.files.list({
                q: query,
                fields: 'files(name, webViewLink, id, mimeType, iconLink, createdTime, modifiedTime, appProperties)',
            });

            if (!data.files) {
                throw new HttpException('No files found for this userId', HttpStatus.NOT_FOUND);
            }

            return data.files;
        } catch (e) {
            throw new HttpException('Cannot find files for this userId', HttpStatus.BAD_REQUEST);
        }
    }

    async downloadFile(id: string): Promise<Buffer> {
        try {
            const { data } = await this.drive.files.get(
                {
                    fileId: id,
                    alt: 'media',
                },
                { responseType: 'arraybuffer' },
            );

            if (!data) {
                throw new HttpException('No file found with this ID', HttpStatus.NOT_FOUND);
            }
            return Buffer.from(data, 'binary');
        } catch (e) {
            throw new HttpException('Cannot download file from Google Drive', HttpStatus.BAD_REQUEST);
        }
    }

    async listFiles(query: string): Promise<IGoogleFile[]> {
        try {
            const { data } = await this.drive.files.list({
                q: query,
                fields: 'files(name, webViewLink, id, mimeType, iconLink, createdTime, modifiedTime)',
            });

            if (!data.files) {
                throw new HttpException('No files found for the given query', HttpStatus.NOT_FOUND);
            }

            return data.files;
        } catch (e) {
            throw new HttpException('Cannot find files matching the query', HttpStatus.BAD_REQUEST);
        }
    }

    async createFile(fileMetadata: any): Promise<IGoogleFile> {
        try {
            const { data } = await this.drive.files.create(fileMetadata);
            return data;
        } catch (e) {
            throw new HttpException('Cannot create file', HttpStatus.BAD_REQUEST);
        }
    }

    async copyFile(file: IGoogleFile, fileMetadata: any): Promise<IGoogleFile> {
        try {
            const { data } = await this.drive.files.copy({
                fileId: file.id,
                resource: fileMetadata,
            });
            return data;
        } catch (e) {
            throw new HttpException(`Cannot copy file ${file.name}`, HttpStatus.BAD_REQUEST);
        }
    }

    async removeFile(id: string): Promise<void> {
        try {
            await this.drive.files.delete({
                fileId: id,
                supportsAllDrives: true,
            });
        } catch (e) {
            throw new HttpException(`Cannot remove file ${id}, error: ${e.message}`, HttpStatus.BAD_REQUEST);
        }
    }

    async createEmptySpreadsheetIntoFolder(googleFolderId: string): Promise<{ googleFileId: string }> {
        const name = 'Empty SpreadSheet.xlsx';
        try {
            const res = await this.sheets.spreadsheets.create({
                resource: {
                    properties: {
                        title: name,
                    },
                },
                fields: 'spreadsheetId',
            });

            const fileId = res.data.spreadsheetId;

            const { data } = await this.drive.files.update({
                fileId,
                addParents: googleFolderId,
                removeParents: 'root',
                fields: 'id, parents',
            });

            if (!data?.id) {
                throw new HttpException('Error moving spreadsheet to folder', HttpStatus.BAD_REQUEST);
            }

            console.log('Spreadsheet created and moved to folder successfully.');
            return { googleFileId: data.id };
        } catch (err) {
            console.error('Error creating spreadsheet:', err);
            throw new HttpException('Error creating spreadsheet', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
