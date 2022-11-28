import { IBaseDTO } from '@shared/interfaces/ibase-dto'

export default class AuthConfigDto implements IBaseDTO {
    constructor(public secret: string, public algorithms: string[]) {}
    id: string | number
}
