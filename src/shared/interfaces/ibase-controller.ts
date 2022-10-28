import { ResponseList } from '@shared/result/response-list'
import { IBaseDTO } from '@shared/interfaces/ibase-dto'

export interface IBaseController {
  getByFilter(baseDTO: IBaseDTO): Promise<ResponseList<IBaseDTO>>;
}
