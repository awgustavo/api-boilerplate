import { ResponseList } from '@shared/result/response-list'
import { IBaseDTO } from '@shared/interfaces/ibase-dto'

export interface IBaseRepository<DTO extends IBaseDTO> {
  create(dto: DTO): DTO;
  update(dto: DTO, id: string | number): DTO;
  getByFilter(dto: DTO): Promise<ResponseList<DTO>>;
  getByID(id: string | number): DTO;
  remove(id: string | number): DTO;
}
