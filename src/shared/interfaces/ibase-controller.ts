import { IBaseDTO } from './ibase-dto'
import { IResponse } from './ibase-response'

export interface IBaseController {
  getByFilter(baseDTO: IBaseDTO): IResponse<IBaseDTO>;
}
