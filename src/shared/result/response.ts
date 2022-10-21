import { IBaseDTO } from '../interfaces/ibase-dto'
import { IResponse } from '../interfaces/ibase-response'

export class Response implements IResponse {
    data: IBaseDTO
}
