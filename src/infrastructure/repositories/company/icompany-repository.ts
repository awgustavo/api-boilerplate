import { CompanyDTO } from '../../dtos/company-dto'
import { IBaseRepository } from '../../../shared/interfaces/ibase-repositóry'

export type ICompanyRepository = IBaseRepository<CompanyDTO>;
