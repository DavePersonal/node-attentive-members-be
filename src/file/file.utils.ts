import {FileType, fileTypeMap} from './file.types'
import * as ExcelJS from 'exceljs'
import * as moment from 'moment'
import {members} from '@prisma/client'
import {memberFieldMap} from '../members/member.utils'

export class FileUtils {

    async getMembersDataFromFile(file: any): Promise<members[]> {
        const filetype = fileTypeMap.get(file.mimetype)?.type
        switch (filetype) {
            case FileType.EXCEL:
                return await this.readFileAndGetJsonDataFromExcel(file.buffer)
            default:
                return []
        }
    }

    private async readFileAndGetJsonDataFromExcel(buffer: Buffer): Promise<members[]> {
        let worksheet = await this.readWorkSheet(buffer)

        const jsonData = this.createJSONFromExcelFile(worksheet)

        buffer = null
        worksheet = null

        return jsonData
    }

    private async readWorkSheet(file: any): Promise<any> {
        const workbook = new ExcelJS.Workbook()

        const excelFile = await workbook.xlsx.load(file)
        return excelFile.worksheets[0]
    }

    private createJSONFromExcelFile(worksheet): members[] {
        const dateColumns = ['date_of_hire', 'date_of_birth', 'effective_date', 'termination_date', 'loa_date', 'reinstatement_date']
        const DATE_FORMAT: 'MMDDYYYY' = 'MMDDYYYY'
        const DB_DATE_FORMAT: 'MM-DD-YYYY' = 'MM-DD-YYYY'
        const resultData: members[] = []

        worksheet.eachRow((row, rowNumber) => {
            const rowData = {}

            row.eachCell((cell, colNumber) => {
                const cellValue = typeof cell.value === 'string' ? cell.value.trim() : typeof cell.value === 'number' ? cell.value : cell.value?.text || cell.value.richText.map(({text}) => text).join('')
                const dbKey = memberFieldMap[worksheet.getCell(1, colNumber)?.value?.trim()]

                if (dateColumns.includes(dbKey)) {
                    rowData[dbKey] = cellValue ? moment.utc(cellValue, DATE_FORMAT).toISOString() : null
                    return
                }

                rowData[dbKey] = cellValue
            })

            if (rowNumber !== 1) {
                resultData.push(rowData as members)
            }
        })
        return resultData
    }
}
