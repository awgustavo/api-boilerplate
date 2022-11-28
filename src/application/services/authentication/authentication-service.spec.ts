import AuthConfigDto from '@infrastructure/dtos/auth-config-dto'
import { AuthenticationService } from './authentication-service'
import AuthUserDto from '@infrastructure/dtos/auth-user'

const jwtConfigTest: Partial<AuthConfigDto> = {
    secret: '123456',
    algorithms: ['HS256'],
}

const authenticationService = new AuthenticationService(jwtConfigTest)

test('shoud create a respository', () => {
    const user = new AuthUserDto('user', ['admin', 'reports', 'config'])
    const tokenData = authenticationService.getToken(user)
    const verifiy = authenticationService.validateToken(tokenData.token)
    expect(verifiy).toBeTruthy()
})
