import { CompanyDomain } from './company-domain'

test('should create a stock', () => {
    const company = new CompanyDomain('PLANK', 31, new Date())
    expect(company).toBeDefined()
})
