import { CompanyDTO } from '@infrastructure/dtos/company-dto'
import { IPersistenceHandler } from '@shared/persistence/ipersistence-handler'
import { ResponseList } from '@shared/result/response-list'
import { ICompanyRepository } from '@infrastructure/repositories/company/icompany-repository'
import { Summary } from '@shared/result/summary'

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

    async getByFilter(filter: CompanyDTO): Promise<ResponseList<CompanyDTO>> {
        const filteredData = await this.persistenceHandler.getByFilter(filter, this.entityName)
        return new ResponseList(filteredData, 200, new Summary())
    }
}
