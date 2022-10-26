import { IPersistenceFactory } from '../ipersistence-factory'
import * as mongoDB from 'mongodb'
import { MongoDBConfig } from './mondodb-config'

export class MongoDBFactory implements IPersistenceFactory<MongoDBConfig, mongoDB.Db> {
    async createConnection(config: MongoDBConfig): Promise<mongoDB.Db> {
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(config.connectionString)

        await client.connect()

        const db: mongoDB.Db = client.db(config.dbName)

        return db
    }

    async createCollection(db: mongoDB.Db, collectionName: string): Promise<mongoDB.Collection> {
        const collection: mongoDB.Collection = db.collection(collectionName)
        return collection
    }
}
