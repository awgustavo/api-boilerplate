import { ResponseList } from '../result/response-list'
import { IBaseDTO } from './ibase-dto'

export interface IBaseService<DTO extends IBaseDTO> {
  getByFilter(baseDTO: DTO): ResponseList<DTO>;
}
