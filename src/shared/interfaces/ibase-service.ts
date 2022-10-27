import { ResponseList } from '@shared/result/response-list'
import { IBaseDTO } from '@shared/interfaces/ibase-dto'

export interface IBaseService<DTO extends IBaseDTO> {
  getByFilter(baseDTO: DTO): ResponseList<DTO>;
}
