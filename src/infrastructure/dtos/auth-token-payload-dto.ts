import { IBaseDTO } from '@shared/interfaces/ibase-dto'

export default class AuthTokenPayloadDto implements IBaseDTO {
    constructor(public token: string, public expDate: number) {}
    id: string | number
}
