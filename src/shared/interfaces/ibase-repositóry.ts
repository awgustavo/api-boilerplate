import { IBaseDTO } from './ibase-dto'

export interface IBaseRepository {
  create(dto: IBaseDTO): IBaseDTO;
  update(dto: IBaseDTO, id: number): IBaseDTO;
  getByFilter(dto: IBaseDTO): IBaseDTO;
  getByID(id: number): IBaseDTO;
  remove(id: number): IBaseDTO;
}
