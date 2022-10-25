import { ResponseList } from '../result/response-list'
import { IBaseDTO } from './ibase-dto'

export interface IBaseRepository<DTO extends IBaseDTO> {
  create(dto: DTO): DTO;
  update(dto: DTO, id: string | number): DTO;
  getByFilter(dto: DTO): ResponseList<DTO>;
  getByID(id: string | number): DTO;
  remove(id: string | number): DTO;
}
