import { IBaseDTO } from '../interfaces/ibase-dto'
import { IResponse } from '../interfaces/ibase-response'
import { Summary } from './summary'

export class ResponseList<T extends IBaseDTO> implements IResponse {
    data: T[]
    summary: Summary
    code: number
    success: boolean
}

export class Response implements IResponse {
    data: IBaseDTO
}
