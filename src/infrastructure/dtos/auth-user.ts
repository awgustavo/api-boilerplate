import { IBaseDTO } from '@shared/interfaces/ibase-dto'

export default class AuthUserDto implements IBaseDTO {
    constructor(public userName: string, public roles: string[]) {}
    id: string | number
}
