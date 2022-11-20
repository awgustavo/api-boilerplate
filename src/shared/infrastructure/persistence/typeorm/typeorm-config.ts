import { IPersistenceConfig } from '@shared/infrastructure/persistence/ipersistence-config'

export class TypeORMConfig implements IPersistenceConfig {
    constructor(public connectionString: string, public dbName: string, public collection: string) {}
}
