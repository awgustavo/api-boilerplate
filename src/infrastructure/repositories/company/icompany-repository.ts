import { CompanyDTO } from '../../../shared/dtos/company-dto'
import { IBaseRepository } from '../../../shared/interfaces/ibase-repositóry'

export interface ICompanyRepository extends IBaseRepository {
  create(company: CompanyDTO): CompanyDTO;
  update(company: CompanyDTO, id: number): CompanyDTO;
}
