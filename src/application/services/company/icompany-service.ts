import { CompanyDTO } from '../../../shared/dtos/company-dto'
import { IResponse } from '../../../shared/interfaces/ibase-response'
import { IBaseService } from '../../../shared/interfaces/ibase-service'

export interface ICompanyService extends IBaseService {
  createNewCompany(companyDTO: CompanyDTO): CompanyDTO;
  updateCompany(companyDTO: CompanyDTO, id: number): CompanyDTO;
}
