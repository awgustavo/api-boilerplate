import { IBaseDTO } from './ibase-dto'
import { IResponse } from './ibase-response'

export interface IBaseService {
  getByFilter(baseDTO: IBaseDTO): IResponse<IBaseDTO>;
}
