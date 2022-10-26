import { CompanyDTO } from '../../infrastructure/dtos/company-dto'
import { CompanyReportDTO } from '../../infrastructure/dtos/company-report-dto'
import { StockDTO } from '../../infrastructure/dtos/stock-dto'
import { CompanyRepository } from '../../infrastructure/repositories/company/company-repository'
import { ExpressHandler } from '../../shared/api/express/express-handler'
import { ResponseList } from '../../shared/result/response-list'
import { Summary } from '../../shared/result/summary'
import { CompanyService } from '../services/company/company-service'
import { CompanyController } from './company-controller'

jest.mock('../../infrastructure/repositories/company/company-repository')
jest.mock('../../shared/api/express/express-handler')

const CompanyRepositoryMock = CompanyRepository as jest.Mock<CompanyRepository>
const companyRepositoryMock = new CompanyRepositoryMock()

const companyServiceMock = new CompanyService(companyRepositoryMock)

const ExpressHandlereMock = ExpressHandler as jest.Mock<ExpressHandler>
const expressHandlerMock = new ExpressHandlereMock()

const companyController = new CompanyController(companyServiceMock, expressHandlerMock)

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

test('should return report data', () => {
    jest.spyOn(companyRepositoryMock, 'getByFilter').mockReturnValueOnce(response)
    const reportData: CompanyReportDTO = companyController.getReport(new CompanyDTO('PLANK', 1, new Date()))

    expect(reportData).toBeDefined()
    expect(reportData.minValue).toEqual(13.1)
    expect(reportData.maxValue).toEqual(15.2)
    expect(reportData.avgValue).toEqual(14.5)
})

test('should return report error 400', () => {
    jest.spyOn(companyRepositoryMock, 'getByFilter').mockReturnValueOnce(response)
    let error
    try {
        companyController.getReport(null)
    } catch (err) {
        error = err
    }
    expect(error).toBeDefined()
    expect(error.code).toEqual(400)
    expect(error.message).toBeDefined()
    expect(error.stack).toBeDefined()
})

test('should return report error 500', () => {
    jest.resetAllMocks()
    jest.spyOn(companyRepositoryMock, 'getByFilter').mockReturnValueOnce(null)
    let error
    try {
        companyController.getReport(new CompanyDTO('PLANK', 1, new Date()))
    } catch (err) {
        error = err
    }
    expect(error).toBeDefined()
    expect(error.code).toEqual(500)
    expect(error.message).toBeDefined()
    expect(error.stack).toBeDefined()
})
