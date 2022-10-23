import { CompanyDTO } from '../../../shared/dtos/company-dto'
import { IBaseDTO } from '../../../shared/interfaces/ibase-dto'
import { IResponse } from '../../../shared/interfaces/ibase-response'
import { ICompanyRepository } from './icompany-repository'

export class CompanyRepository implements ICompanyRepository {
    getByID(id: number): IBaseDTO {
        throw new Error('Method not implemented.')
    }

    remove(id: number): IBaseDTO {
        throw new Error('Method not implemented.')
    }
    create(company: CompanyDTO): CompanyDTO {
        throw new Error('Method not implemented.')
    }

    update(company: CompanyDTO, id: number): CompanyDTO {
        throw new Error('Method not implemented.')
    }

    getByFilter(companyDTO: CompanyDTO): IResponse<CompanyDTO> {
        throw new Error('Method not implemented.')
    }
}
