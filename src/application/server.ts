import { CompanyDTO } from '@infrastructure/dtos/company-dto'
import { ExpressHandler } from '@shared/infrastructure/api/express/express-handler'
import { IRESTHandler } from '@shared/infrastructure/api/irest-handler'
import { IBaseController } from '@shared/interfaces/ibase-controller'
import { IPersistenceHandler } from '@shared/infrastructure/persistence/ipersistence-handler'
import { MongoDBConfig } from '@shared/infrastructure/persistence/mongodb/mondodb-config'
import { MongoDBFactory } from '@shared/infrastructure/persistence/mongodb/mongodb-factory'
import dotenv from 'dotenv'
import { CompanyController } from '@application/controllers/company-controller'
import { APIModules } from '@application/module'
import { CompanyService } from '@application/services/company/company-service'
import { CompanyRepository } from '@infrastructure/repositories/company/company-repository'
import { SQSProvider } from '@shared/infrastructure/providers/sqs/sqs-provider'
import { TypeORMHandler } from '@shared/infrastructure/persistence/typeorm/typeorm-handler'
import { apppDataSource } from '@infrastructure/providers/typeorm/app-data-source-nosql'
import { AuthenticationService } from '@application/services/authentication/authentication-service'

class Server {
    private restHandler: IRESTHandler
    private persistenceHandler: IPersistenceHandler
    private persistenceFactory: MongoDBFactory
    private companyController: IBaseController
    private authenticationService: AuthenticationService
    private db
    constructor() {
        this.initiateServer()
    }

    async initiateServer() {
        dotenv.config({ path: 'config/.env' })
        this.authenticationService = new AuthenticationService({
            secret: process.env['JWT_SECRET'],
            algorithms: [process.env['JWT_ALGORITHM']],
        })
        this.restHandler = new ExpressHandler(this.authenticationService)
        this.persistenceFactory = new MongoDBFactory()

        this.db = await new MongoDBFactory().createConnection(
            new MongoDBConfig(process.env.MONGO_DB_URL, process.env.MONGO_COLLECTION, 'company')
        )

        this.persistenceHandler = new TypeORMHandler(apppDataSource)

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
            'company',
            new SQSProvider()
        )
    }
}

new Server()
