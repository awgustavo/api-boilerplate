import { IBaseDomain } from '@shared/interfaces/ibase-domain'
import { IBaseDTO } from '@shared/interfaces/ibase-dto'

export interface IBaseMapper {
  toDTO(domain: IBaseDomain): IBaseDTO;
  toDomain(dto: IBaseDTO): IBaseDomain;
}
