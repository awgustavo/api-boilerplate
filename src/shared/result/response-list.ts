import { IBaseDTO } from '@shared/interfaces/ibase-dto'
import { IResponse } from '@shared/interfaces/ibase-response'
import { Summary } from '@shared/result/summary'

export class ResponseList<T extends IBaseDTO> implements IResponse<T[]> {
    statusCode: number
    error?: Error
    data: T[]
    summary: Summary

    constructor(data: T[], statusCode: number, summary: Summary, error: Error = null) {
        this.data = data
        this.statusCode = statusCode
        this.error = error
    }
}
