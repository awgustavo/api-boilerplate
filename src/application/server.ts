import { CompanyDTO } from '@infrastructure/dtos/company-dto'
import { ExpressHandler } from '@shared/api/express/express-handler'
import { IRESTHandler } from '@shared/api/irest-handler'
import { IBaseController } from '@shared/interfaces/ibase-controller'
import { IPersistenceHandler } from '@shared/persistence/ipersistence-handler'
import { MongoDBConfig } from '@shared/persistence/mongodb/mondodb-config'
import { MongoDBFactory } from '@shared/persistence/mongodb/mongodb-factory'
import { MongoDBHandler } from '@shared/persistence/mongodb/mongodb-handler'
import dotenv from 'dotenv'
import { CompanyController } from '@application/controllers/company-controller'
import { APIModules } from '@application/module'
import { CompanyService } from '@application/services/company/company-service'
import { CompanyRepository } from '@infrastructure/repositories/company/company-repository'

class Server {
    private restHandler: IRESTHandler
    private persistenceHandler: IPersistenceHandler
    private persistenceFactory: MongoDBFactory
    private companyController: IBaseController
    private db
    constructor() {
        this.initiateServer()
    }

    async initiateServer() {
        dotenv.config({ path: 'config/.env' })

        this.restHandler = new ExpressHandler()
        this.persistenceFactory = new MongoDBFactory()

        this.db = await new MongoDBFactory().createConnection(
            new MongoDBConfig(process.env.MONGO_DB_URL, process.env.MONGO_COLLECTION, 'company')
        )

        this.persistenceHandler = new MongoDBHandler(this.db)

        this.initiateControllers()
        this.restHandler.startAPI(parseInt(process.env['PORT']))
    }

    initiateControllers() {
        this.companyController = APIModules.resgisterModules<CompanyDTO>(
            CompanyController,
            CompanyService,
            CompanyRepository,
            this.restHandler,
            this.persistenceHandler,
            this.persistenceFactory,
            this.db,
            'company'
        )
    }
}
new Server()
