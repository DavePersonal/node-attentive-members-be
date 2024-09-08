export interface IUploadFile {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    buffer: Buffer
    size: number
}

export interface IGoogleFile {
    id: string
    name: string
    mimeType: string
    webViewLink: string
    iconLink: string
    createdTime: string
    modifiedTime: string
    appProperties?: any
    files?: IGoogleFile[]
}

export enum FileType {
    PDF = 'pdf',
    EXCEL = 'excel',
    CSV = 'csv',
}

export const fileTypeMap = new Map<string, {type: string}>([
    (['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', {
        type: FileType.EXCEL,
    }]),
    ['application/pdf', {
        type: FileType.PDF,
    },],
    ['text/csv', {
        type: FileType.CSV,
    }],
    ['application/vnd.ms-excel', {
        type: FileType.EXCEL,
    }]
])
