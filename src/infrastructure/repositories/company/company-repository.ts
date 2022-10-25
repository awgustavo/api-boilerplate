import { CompanyDTO } from '../../entities/company-dto'
import { IPersistenceHandler } from '../../../shared/pesistence/ipersistence-handler'
import { ResponseList } from '../../../shared/result/response-list'
import { ICompanyRepository } from './icompany-repository'

export class CompanyRepository implements ICompanyRepository {
    constructor(private persistenceHandler: IPersistenceHandler, private entityName: string) {}
    getByID(id: string): CompanyDTO {
        return this.persistenceHandler.getOneByID(id, this.entityName)
    }

    remove(id: number): CompanyDTO {
        return this.persistenceHandler.delete(id, this.entityName)
    }
    create(company: CompanyDTO): CompanyDTO {
        return this.persistenceHandler.save(company, this.entityName)
    }

    update(company: CompanyDTO, id: number): CompanyDTO {
        return this.persistenceHandler.update(company, id, this.entityName)
    }

    getByFilter(filter: CompanyDTO): ResponseList<CompanyDTO> {
        return this.persistenceHandler.getByFilter(filter, this.entityName)
    }
}
