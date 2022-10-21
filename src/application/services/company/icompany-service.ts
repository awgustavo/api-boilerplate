export interface ICompanyService {
  createNewCompany(companyDTO: CompanyDTO): CompanyDTO;
  updateCompany(companyDTO: CompanyDTO, id: number): CompanyDTO;
  getCompanies(companyDTO: CompanyDTO): CompanyDTO[];
}
