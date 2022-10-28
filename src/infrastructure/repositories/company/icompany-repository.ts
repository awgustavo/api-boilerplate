import { CompanyDTO } from '@infrastructure/dtos/company-dto'
import { IBaseRepository } from '@shared/interfaces/ibase-repositóry'

export type ICompanyRepository = IBaseRepository<CompanyDTO>;
