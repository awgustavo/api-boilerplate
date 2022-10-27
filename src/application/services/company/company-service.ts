import { ICompanyRepository } from '@infrastructure/repositories/company/icompany-repository'
import { CompanyDTO } from '@infrastructure/dtos/company-dto'
import { ResponseList } from '@shared/result/response-list'
import { ICompanyService } from '@application/services/company/icompany-service'
import { CompanyReportDTO } from '@infrastructure/dtos/company-report-dto'
import { CompanyMapper } from '@infrastructure/mappers/company-mapper'

export class CompanyService implements ICompanyService {
    constructor(private companyRepository: ICompanyRepository) {}

    getByFilter(baseDTO: CompanyDTO): ResponseList<CompanyDTO> {
        return this.companyRepository.getByFilter(baseDTO)
    }

    createNewCompany(company: CompanyDTO) {
        return this.companyRepository.create(company)
    }

    getReport(company: CompanyDTO): CompanyReportDTO {
        const companyData: ResponseList<CompanyDTO> = this.companyRepository.getByFilter(company)
        const domainData = new CompanyMapper().toDomain(companyData.data[0])
        return new CompanyReportDTO(
            domainData.name,
            domainData.getMaxPrice(),
            domainData.getMinPrice(),
            domainData.getAvgPrice()
        )
    }
}
