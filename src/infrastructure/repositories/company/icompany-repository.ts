export interface ICompanyRepository {
  create(company: CompanyDTO): CompanyDTO;
  update(company: CompanyDTO, id: number): CompanyDTO;
  getByFilter(companyDTO: CompanyDTO): CompanyDTO[];
}
