import { Request, Response } from "express";
import { IBaseController } from "../../shared/interfaces/ibase-controller";
import { IResponse } from "../../shared/interfaces/ibase-response";
import { CompanyService } from "../services/company/company-service";

export class CompanyController implements IBaseController {
  constructor(private companyService: CompanyService) {}

  public getByFilter(): IResponse {
    throw new Error("Method not implemented.");
  }

  public createNewCompany(request: Request, response: Response) {
    const company = this.companyService.createNewCompany(request.body);
    response.json(company);
  }
}
