import { CompanyDTO } from '../../../infrastructure/entities/company-dto'
import { IBaseService } from '../../../shared/interfaces/ibase-service'

export interface ICompanyService extends IBaseService<CompanyDTO> {
  createNewCompany(company: CompanyDTO);
}
