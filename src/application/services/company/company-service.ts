import { ICompanyRepository } from '../../../infrastructure/repositories/company/icompany-repository'
import { CompanyDTO } from '../../../shared/dtos/company-dto'
import { IBaseDTO } from '../../../shared/interfaces/ibase-dto'
import { IResponse } from '../../../shared/interfaces/ibase-response'
import { ICompanyService } from './icompany-service'

export class CompanyService implements ICompanyService {
    constructor(private companyRepository: ICompanyRepository) {}

    getByFilter(baseDTO: CompanyDTO): IResponse<CompanyDTO> {
        throw new Error('Method not implemented.')
    }

    createNewCompany(companyDTO: CompanyDTO): CompanyDTO {
        return this.companyRepository.create(companyDTO)
    }

    updateCompany(companyDTO: CompanyDTO, id: number): CompanyDTO {
        return this.companyRepository.update(companyDTO, id)
    }
}
