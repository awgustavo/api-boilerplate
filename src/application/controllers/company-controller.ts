import { ICompanyService } from '@application/services/company/icompany-service'
import { CompanyDTO } from '@infrastructure/dtos/company-dto'
import { CompanyReportDTO } from '@infrastructure/dtos/company-report-dto'
import { IRESTHandler } from '@shared/api/irest-handler'
import { ControllerError } from '@shared/error/controller-error'
import { IBaseController } from '@shared/interfaces/ibase-controller'
import { IResponse } from '@shared/interfaces/ibase-response'
import { ResponseApp } from '@shared/result/response'
import { ResponseList } from '@shared/result/response-list'

export class CompanyController implements IBaseController {
    constructor(private companyService: ICompanyService, restHandler: IRESTHandler) {
        this.companyService = companyService
        restHandler.registerRoutes('get', '/companies', this.getByFilter.bind(this))
        restHandler.registerRoutes('post', '/company', this.createNewCompany.bind(this))
        restHandler.registerRoutes('get', '/company/report', this.getReport.bind(this))
    }

    public async getByFilter(companyDTO: CompanyDTO): Promise<ResponseList<CompanyDTO>> {
        try {
            if (!companyDTO) throw new ControllerError('Company controller Bad Request', '', 400)
            return await this.companyService.getByFilter(companyDTO)
        } catch (error) {
            if (error instanceof ControllerError) throw error
            throw new ControllerError(`Company controller Error: ${error.message}`, error.stack, 500)
        }
    }

    public createNewCompany(company: CompanyDTO): IResponse<CompanyDTO> {
        try {
            if (!company) throw new ControllerError('Company controller Bad Request', '', 400)
            this.companyService.createNewCompany(company)
            return new ResponseApp(company, 200)
        } catch (error) {
            if (error instanceof ControllerError) throw error
            throw new ControllerError(`Company controller Error: ${error.message}`, error.stack, 500)
        }
    }

    public addStocksToCompany(company: CompanyDTO): IResponse<CompanyDTO> {
        this.companyService.createNewCompany(company)
        return new ResponseApp(company, 200)
    }

    public async getReport(companyDTO: CompanyDTO): Promise<CompanyReportDTO> {
        try {
            if (!companyDTO) throw new ControllerError('Company controller Bad Request', '', 400)
            return await this.companyService.getReport(companyDTO)
        } catch (error) {
            if (error instanceof ControllerError) throw error
            throw new ControllerError(`Company controller Error: ${error.message}`, error.stack, 500)
        }
    }
}
