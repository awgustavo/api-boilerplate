import { ObjectId } from 'mongodb'
import { IBaseDTO } from '@shared/interfaces/ibase-dto'
import { IPersistenceHandler } from '@shared/persistence/ipersistence-handler'
import * as mongoDB from 'mongodb'

export class MongoDBHandler implements IPersistenceHandler {
    constructor(private db: mongoDB.Db) {}

    async save(entity: IBaseDTO, entityName: string) {
        const entityCreated = await this.db.collection(entityName).insertOne(entity)
        return entityCreated
    }

    async update(entity: IBaseDTO, id: string, entityName: string) {
        const query = { _id: new ObjectId(id) }
        const result = await this.db.collection(entityName).updateOne(query, { $set: entity })
        return result
    }

    async getByFilter(filter: IBaseDTO, entityName: string) {
        const entity = await this.db.collection(entityName).findOne(filter)
        return entity
    }

    async getOneByID(id: string, entityName: string) {
        const query = { _id: new ObjectId(id) }
        const entity = await this.db.collection(entityName).findOne(query)
        return entity
    }

    async delete(id: string, entityName: string) {
        const query = { _id: new ObjectId(id) }
        const result = await this.db.collection(entityName).deleteOne(query)
        return result
    }
}
