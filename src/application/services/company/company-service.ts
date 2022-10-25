import { ICompanyRepository } from "../../../infrastructure/repositories/company/icompany-repository";
import { CompanyDTO } from "../../../infrastructure/entities/company-dto";
import { ResponseList } from "../../../shared/result/response-list";
import { ICompanyService } from "./icompany-service";

export class CompanyService implements ICompanyService {
  constructor(private companyRepository: ICompanyRepository) {}

  getByFilter(baseDTO: CompanyDTO): ResponseList<CompanyDTO> {
    return this.companyRepository.getByFilter(baseDTO);
  }

  createNewCompany(company: CompanyDTO) {
    return this.companyRepository.create(company);
  }
}
