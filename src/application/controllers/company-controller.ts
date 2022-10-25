import { IRESTHandler } from "../../shared/api/irest-handler";
import { CompanyDTO } from "../../infrastructure/entities/company-dto";
import { IBaseController } from "../../shared/interfaces/ibase-controller";
import { IResponse } from "../../shared/interfaces/ibase-response";
import { ResponseApp } from "../../shared/result/response";
import { ICompanyService } from "../services/company/icompany-service";

export class CompanyController implements IBaseController {
  private _companyService: ICompanyService;
  private _restHandler: IRESTHandler;
  constructor(companyService: ICompanyService, restHandler: IRESTHandler) {
    this._companyService = companyService;
    this._restHandler = restHandler;
    restHandler.registerRoutes("get", "/companies", this.getByFilter.bind(this));
    restHandler.registerRoutes("post", "/company", this.createNewCompany.bind(this));
  }

  public getByFilter(companyDTO: CompanyDTO): IResponse<CompanyDTO> {
    return new ResponseApp(companyDTO, 200);
  }

  public createNewCompany(company: CompanyDTO): IResponse<CompanyDTO> {
    this._companyService.createNewCompany(company);
    return new ResponseApp(company, 200);
  }
}
