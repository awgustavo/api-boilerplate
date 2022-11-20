import { ICompanyRepository } from '@infrastructure/repositories/company/icompany-repository'
import { CompanyDTO } from '@infrastructure/dtos/company-dto'
import { ResponseList } from '@shared/result/response-list'
import { ICompanyService } from '@application/services/company/icompany-service'
import { CompanyReportDTO } from '@infrastructure/dtos/company-report-dto'
import { CompanyMapper } from '@infrastructure/mappers/company-mapper'
import { SQSProvider } from '@shared/infrastructure/providers/sqs/sqs-provider'

export class CompanyService implements ICompanyService {
    constructor(private companyRepository: ICompanyRepository, private sqs: SQSProvider) {}

    async getByFilter(baseDTO: CompanyDTO): Promise<ResponseList<CompanyDTO>> {
        return await this.companyRepository.getByFilter(baseDTO)
    }

    createNewCompany(company: CompanyDTO) {
        return this.companyRepository.create(company)
    }

    async getReport(company: CompanyDTO): Promise<CompanyReportDTO> {
        const companyData: ResponseList<CompanyDTO> = await this.companyRepository.getByFilter(company)
        const domainData = new CompanyMapper().toDomain(companyData.data[0])
        await this.sqs.sendMessage(process.env['STOCKS_QUEUE_URL'], JSON.stringify(domainData))
        return new CompanyReportDTO(
            domainData.name,
            domainData.getMaxPrice(),
            domainData.getMinPrice(),
            domainData.getAvgPrice()
        )
    }
}
