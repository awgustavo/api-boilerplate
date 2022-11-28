import { DataSource } from 'typeorm'
import { CompanyEntity } from './entities/company-entity'
import { StockEntity } from './entities/stock-entity'

const DB_URL_DEV = 'mongodb://localhost:27017/stocks-dev'

export const apppDataSource = new DataSource({
    url: DB_URL_DEV,
    type: 'mongodb',
    synchronize: true,
    logging: true,
    entities: [CompanyEntity, StockEntity],
    subscribers: [],
    migrations: ['src/infrastructure/providers/typeorm/migrations/**/*{.ts,.js}'],
})

apppDataSource.initialize()
