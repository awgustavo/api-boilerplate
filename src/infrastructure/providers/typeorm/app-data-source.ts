import { DataSource } from 'typeorm'
import { CompanyEntity } from './entities/company-entity'
import { StockEntity } from './entities/stock-entity'

const DB_URL_DEV = 'postgres://postgres:postgres@localhost:5432/stocks_db_dev'

export const apppDataSource = new DataSource({
    url: DB_URL_DEV,
    type: 'postgres',
    synchronize: true,
    logging: true,
    entities: [CompanyEntity, StockEntity],
    subscribers: [],
    migrations: ['src/infrastructure/providers/typeorm/migrations/**/*{.ts,.js}'],
})

apppDataSource.initialize()
