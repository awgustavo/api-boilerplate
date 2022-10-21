import { CompanyRepository } from './company-repository'

test('should create a new CompanyService', () => {
    const companyRepository: CompanyRepository = new CompanyRepository()
    expect(companyRepository).toBeInstanceOf(CompanyRepository)
})
