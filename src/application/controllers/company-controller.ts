import { IRESTHandler } from '../../shared/api/irest-handler'
import { CompanyDTO } from '../../infrastructure/dtos/company-dto'
import { IBaseController } from '../../shared/interfaces/ibase-controller'
import { IResponse } from '../../shared/interfaces/ibase-response'
import { ResponseApp } from '../../shared/result/response'
import { ICompanyService } from '../services/company/icompany-service'
import { CompanyReportDTO } from '../../infrastructure/dtos/company-report-dto'
import { ControllerError } from '../../shared/error/controller-error'
import { ResponseList } from '../../shared/result/response-list'

export class CompanyController implements IBaseController {
    constructor(private companyService: ICompanyService, restHandler: IRESTHandler) {
        this.companyService = companyService
        restHandler.registerRoutes('get', '/companies', this.getByFilter.bind(this))
        restHandler.registerRoutes('post', '/company', this.createNewCompany.bind(this))
    }

    public getByFilter(companyDTO: CompanyDTO): ResponseList<CompanyDTO> {
        return this.companyService.getByFilter(companyDTO)
    }

    public createNewCompany(company: CompanyDTO): IResponse<CompanyDTO> {
        this.companyService.createNewCompany(company)
        return new ResponseApp(company, 200)
    }

    public addStocksToCompany(company: CompanyDTO): IResponse<CompanyDTO> {
        this.companyService.createNewCompany(company)
        return new ResponseApp(company, 200)
    }

    public getReport(companyDTO: CompanyDTO): CompanyReportDTO {
        try {
            if (!companyDTO) throw new ControllerError('Company controller Bad Request', '', 400)
            return this.companyService.getReport(companyDTO)
        } catch (error) {
            if (error instanceof ControllerError) throw error
            throw new ControllerError(`Company controller Error: ${error.message}`, error.stack, 500)
        }
    }
}
