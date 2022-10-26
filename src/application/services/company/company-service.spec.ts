import { CompanyDTO } from '../../../infrastructure/dtos/company-dto'
import { StockDTO } from '../../../infrastructure/dtos/stock-dto'
import { CompanyRepository } from '../../../infrastructure/repositories/company/company-repository'
import { ResponseList } from '../../../shared/result/response-list'
import { Summary } from '../../../shared/result/summary'
import { CompanyService } from './company-service'

jest.mock('../../../infrastructure/repositories/company/company-repository')

const CompanyRepositoryMock = CompanyRepository as jest.Mock<CompanyRepository>
const companyRepositoryMock = new CompanyRepositoryMock()
const companyService = new CompanyService(companyRepositoryMock)

const response = new ResponseList<CompanyDTO>(
    [
        new CompanyDTO('PLANK', 1, new Date(), [
            new StockDTO(13.1, new Date(2022, 10, 1)),
            new StockDTO(14.8, new Date(2022, 10, 2)),
            new StockDTO(15.2, new Date(2022, 10, 3)),
            new StockDTO(14.9, new Date(2022, 10, 4)),
        ]),
    ],
    200,
    new Summary()
)

test('shoud create a respository', () => {
    expect(companyService).toBeDefined()
})

test('shoud create a respository', () => {
    const response = new ResponseList<CompanyDTO>([new CompanyDTO('test', 1, new Date())], 200, new Summary())
    jest.spyOn(companyRepositoryMock, 'getByFilter').mockReturnValueOnce(response)
    const result = companyService.getByFilter(new CompanyDTO('teste', 1, new Date()))
    expect(result).toBeDefined()
})

test('shoud return report data of a specific company a respository', () => {
    jest.spyOn(companyRepositoryMock, 'getByFilter').mockReturnValueOnce(response)
    const result = companyService.getReport(new CompanyDTO('PLANK', 1, new Date()))

    expect(result).toBeDefined()
    expect(result.minValue).toEqual(13.1)
    expect(result.maxValue).toEqual(15.2)
    expect(result.avgValue).toEqual(14.5)
})
