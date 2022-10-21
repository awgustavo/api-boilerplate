import { CompanyRepository } from '../../../infrastructure/repositories/company/company-repository'
import { CompanyService } from './company-service'

test('should create a new CompanyService', () => {
    const companyService: CompanyService = new CompanyService(new CompanyRepository())
    expect(companyService).toBeInstanceOf(CompanyService)
})
