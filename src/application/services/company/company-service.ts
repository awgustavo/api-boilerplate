import { ICompanyRepository } from '../../../infrastructure/repositories/company/icompany-repository'
import { ICompanyService } from './icompany-service'

export class CompanyService implements ICompanyService {
    constructor(private companyRepository: ICompanyRepository) {}

    createNewCompany(companyDTO: CompanyDTO): CompanyDTO {
        return this.companyRepository.create(companyDTO)
    }

    updateCompany(companyDTO: CompanyDTO, id: number): CompanyDTO {
        return this.companyRepository.update(companyDTO, id)
    }

    getCompanies(companyDTO: CompanyDTO): CompanyDTO[] {
        return this.companyRepository.getByFilter(companyDTO)
    }
}
