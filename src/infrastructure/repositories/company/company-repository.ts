import { ICompanyRepository } from './icompany-repository'

export class CompanyRepository implements ICompanyRepository {
    create(company: CompanyDTO): CompanyDTO {
        throw new Error('Method not implemented.')
    }
    update(company: CompanyDTO, id: number): CompanyDTO {
        throw new Error('Method not implemented.')
    }
    getByFilter(companyDTO: CompanyDTO): CompanyDTO[] {
        throw new Error('Method not implemented.')
    }
}
