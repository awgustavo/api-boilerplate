import { ResponseList } from '../result/response-list'
import { IBaseDTO } from './ibase-dto'

export interface IBaseController {
  getByFilter(baseDTO: IBaseDTO): ResponseList<IBaseDTO>;
}
