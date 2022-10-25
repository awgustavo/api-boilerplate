import { IPersistenceConfig } from '../ipersistence-config'

export class MongoDBConfig implements IPersistenceConfig {
    constructor(public connectionString: string, public dbName: string, public collection: string) {}
}
