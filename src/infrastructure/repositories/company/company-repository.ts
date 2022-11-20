import { CompanyDTO } from '@infrastructure/dtos/company-dto'
import { IPersistenceHandler } from '@shared/infrastructure/persistence/ipersistence-handler'
import { ResponseList } from '@shared/result/response-list'
import { ICompanyRepository } from '@infrastructure/repositories/company/icompany-repository'
import { Summary } from '@shared/result/summary'

export class CompanyRepository implements ICompanyRepository {
    private ENTTITY_NAME = 'CompanyEntity'
    constructor(private persistenceHandler: IPersistenceHandler, private entityName: string) {}
    getByID(id: string): CompanyDTO {
        return this.persistenceHandler.getOneByID(id, this.ENTTITY_NAME)
    }

    remove(id: number): CompanyDTO {
        return this.persistenceHandler.delete(id, this.ENTTITY_NAME)
    }
    create(company: CompanyDTO): CompanyDTO {
        return this.persistenceHandler.save(company, this.ENTTITY_NAME)
    }

    update(company: CompanyDTO, id: number): CompanyDTO {
        return this.persistenceHandler.update(company, id, this.ENTTITY_NAME)
    }

    async getByFilter(filter: CompanyDTO): Promise<ResponseList<CompanyDTO>> {
        const filteredData = await this.persistenceHandler.getByFilter(filter, this.ENTTITY_NAME)
        return new ResponseList(filteredData, 200, new Summary())
    }
}
