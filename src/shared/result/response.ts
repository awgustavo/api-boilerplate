import { IBaseDTO } from '../interfaces/ibase-dto'
import { IResponse } from '../interfaces/ibase-response'

export class ResponseApp<T extends IBaseDTO> implements IResponse<IBaseDTO> {
    public statusCode: number
    public error?: Error
    public data: T

    constructor(data: T, statusCode: number, error: Error = null) {
        this.data = data
        this.statusCode = statusCode
        this.error = error
    }
}
