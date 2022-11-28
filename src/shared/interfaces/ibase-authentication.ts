import { IBaseDTO } from './ibase-dto'

export interface IBaseAuthentication {
  getToken(baseDTO: IBaseDTO): IBaseDTO;
  validateToken(request, response, callback): void;
}
