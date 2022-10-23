import dotenv from 'dotenv'
import { CompanyRepository } from '../infrastructure/repositories/company/company-repository'
import { ExpressHandler } from '../shared/api/express/express-handler'
import { IRESTHandler } from '../shared/api/express/irest-handler'
import { CompanyController } from './controllers/company-controller'
import { APIModules } from './module'
import { CompanyService } from './services/company/company-service'

class Server {
    private restHandler: IRESTHandler
    constructor() {
        this.initiateServer()
    }

    initiateServer() {
        dotenv.config({ path: 'config/.env' })
        this.restHandler = new ExpressHandler()
        this.initiateControllers()
        this.restHandler.startAPI(parseInt(process.env['PORT']))
    }

    initiateControllers() {
        const companyController = APIModules.resgisterModules(
            CompanyController,
            CompanyService,
            CompanyRepository,
            this.restHandler
        )
    }
}
new Server()
