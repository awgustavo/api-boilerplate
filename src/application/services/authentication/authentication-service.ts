import AuthConfigDto from '@infrastructure/dtos/auth-config-dto'
import AuthTokenPayloadDto from '@infrastructure/dtos/auth-token-payload-dto'
import AuthUserDto from '@infrastructure/dtos/auth-user'
import { IBaseAuthentication } from '@shared/interfaces/ibase-authentication'
import jwt from 'jsonwebtoken'

const DEFUALT_EXPIRATION: number = 60 * 6

export class AuthenticationService implements IBaseAuthentication {
    constructor(private config: Partial<AuthConfigDto>) {}
    getToken(authData: AuthUserDto): AuthTokenPayloadDto {
        const expDate = new Date()
        expDate.setSeconds(expDate.getSeconds() + DEFUALT_EXPIRATION)
        return new AuthTokenPayloadDto(
            jwt.sign(Object.assign({}, authData), this.config.secret, { expiresIn: DEFUALT_EXPIRATION }),
            expDate.getTime()
        )
    }

    validateToken(token: string) {
        try {
            return jwt.verify(token, this.config.secret)
        } catch {
            throw new Error('401 - forbiden')
        }
    }
}
