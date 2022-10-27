import { CompanyDTO } from '@infrastructure/dtos/company-dto'
import { CompanyReportDTO } from '@infrastructure/dtos/company-report-dto'
import { IBaseService } from '@shared/interfaces/ibase-service'

export interface ICompanyService extends IBaseService<CompanyDTO> {
  createNewCompany(company: CompanyDTO);
  getReport(company: CompanyDTO): CompanyReportDTO;
}
