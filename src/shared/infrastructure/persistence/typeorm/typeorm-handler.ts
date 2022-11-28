import { IBaseDTO } from '@shared/interfaces/ibase-dto'
import { IPersistenceHandler } from '@shared/infrastructure/persistence/ipersistence-handler'
import { DataSource } from 'typeorm'
import { CompanyEntity } from '@infrastructure/providers/typeorm/entities/company-entity'

export class TypeORMHandler implements IPersistenceHandler {
    constructor(private dataSource: DataSource) {}

    async save(entity) {
        const repository = await this.dataSource.getRepository(CompanyEntity)
        this.dataSource.getMetadata(CompanyEntity)
        const entityCreated = await repository.save(entity)
        return entityCreated
    }

    async update(entity: IBaseDTO, id: string, entityName: string) {
        const repository = this.dataSource.getRepository(this.dataSource.options.entities[entityName])
        const result = await repository.update(id, entity)
        return result
    }

    async getByFilter(filter: IBaseDTO, entityName: string) {
        const repository = this.dataSource.getRepository(this.dataSource.options.entities[entityName])
        const result = await repository.findBy(filter)
        return result
    }

    async getOneByID(id: number, entityName: string) {
        const repository = this.dataSource.getRepository(this.dataSource.options.entities[entityName])
        const result = await repository.findOneBy({ id: id })
        return result
    }

    async delete(id: string, entityName: string) {
        const repository = this.dataSource.getRepository(this.dataSource.options.entities[entityName])
        const result = await repository.delete({ id: id })
        return result
    }
}
