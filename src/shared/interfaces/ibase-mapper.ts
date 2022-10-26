import { IBaseDomain } from './ibase-domain'
import { IBaseDTO } from './ibase-dto'

export interface IBaseMapper {
  toDTO(domain: IBaseDomain): IBaseDTO;
  toDomain(dto: IBaseDTO): IBaseDomain;
}
