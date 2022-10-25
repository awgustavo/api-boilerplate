import { ObjectId } from 'mongodb'
import { IBaseDTO } from '../../interfaces/ibase-dto'
import { IPersistenceHandler } from '../ipersistence-handler'
import * as mongoDB from 'mongodb'

export class MongoDBHandler implements IPersistenceHandler {
    constructor(private db: mongoDB.Db) {}

    async save(entity: IBaseDTO, entityName: string) {
        const entityCreated = await this.db.collection(entityName).insertOne(entity)
        return entityCreated
    }

    async update(entity: IBaseDTO, id: string, entityName: string) {
        const query = { _id: new ObjectId(id) }
        const result = await this.db[entityName].updateOne(query, { $set: entity })
        return result
    }

    async getByFilter(filter: IBaseDTO, entityName: string) {
        const entity = (await this.db[entityName].find(filter)) as IBaseDTO[]
        return entity
    }

    async getOneByID(id: string, entityName: string) {
        const query = { _id: new ObjectId(id) }
        const entity = (await this.db[entityName].findOne(query)) as IBaseDTO
        return entity
    }

    async delete(id: string, entityName: string) {
        const query = { _id: new ObjectId(id) }
        const result = await this.db[entityName].deleteOne(query)
        return result
    }
}
