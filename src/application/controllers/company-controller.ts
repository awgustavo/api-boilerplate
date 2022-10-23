import { Request, Response } from 'express'
import { ExpressHandler } from '../../shared/api/express/express-handler'
import { IRESTHandler } from '../../shared/api/express/irest-handler'
import { CompanyDTO } from '../../shared/dtos/company-dto'
import { IBaseController } from '../../shared/interfaces/ibase-controller'
import { IBaseDTO } from '../../shared/interfaces/ibase-dto'
import { IResponse } from '../../shared/interfaces/ibase-response'
import { ResponseApp } from '../../shared/result/response'
import { ICompanyService } from '../services/company/icompany-service'

export class CompanyController implements IBaseController {
    constructor(private companyService: ICompanyService, restHandler: IRESTHandler) {
        restHandler.registerRoutes('get', '/companies', this.getByFilter)
    }

    public getByFilter(companyDTO: CompanyDTO): IResponse<CompanyDTO> {
        return new ResponseApp(companyDTO, 200)
    }

    public createNewCompany(request: Request, response: Response) {
        const company = this.companyService.createNewCompany(request.body)
        response.json(company)
    }
}
