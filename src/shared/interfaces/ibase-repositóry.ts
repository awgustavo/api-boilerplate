import { IBaseDTO } from './ibase-dto'
import { IResponse } from './ibase-response'

export interface IBaseRepository {
  create(dto: IBaseDTO): IBaseDTO;
  update(dto: IBaseDTO, id: number): IBaseDTO;
  getByFilter(dto: IBaseDTO): IResponse<IBaseDTO>;
  getByID(id: number): IBaseDTO;
  remove(id: number): IBaseDTO;
}
