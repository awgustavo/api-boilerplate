import { CompanyService } from '@application/services/company/company-service'
import { CompanyDTO } from '@infrastructure/dtos/company-dto'
import { CompanyReportDTO } from '@infrastructure/dtos/company-report-dto'
import { StockDTO } from '@infrastructure/dtos/stock-dto'
import { CompanyRepository } from '@infrastructure/repositories/company/company-repository'
import { ExpressHandler } from '@shared/infrastructure/api/express/express-handler'
import { ResponseList } from '@shared/result/response-list'
import { Summary } from '@shared/result/summary'
import { CompanyController } from '@application/controllers/company-controller'
import { SQSProvider } from '@shared/infrastructure/providers/sqs/sqs-provider'

jest.mock('@infrastructure/repositories/company/company-repository')
jest.mock('@shared/infrastructure/api/express/express-handler')

const CompanyRepositoryMock = CompanyRepository as jest.Mock<CompanyRepository>
const companyRepositoryMock = new CompanyRepositoryMock()

jest.mock('@shared/infrastructure/providers/sqs/sqs-provider')
const SQSProviderMock = SQSProvider as jest.Mock<SQSProvider>
const sqsProviderMock = new SQSProviderMock()

const companyServiceMock = new CompanyService(companyRepositoryMock, sqsProviderMock)

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

test('should return report data', async () => {
    const responsePromise = new Promise<ResponseList<CompanyDTO>>((resolve) => resolve(response))
    jest.spyOn(companyRepositoryMock, 'getByFilter').mockReturnValueOnce(responsePromise)
    const reportData: CompanyReportDTO = await companyController.getReport(new CompanyDTO('PLANK', 1, new Date()))

    expect(reportData).toBeDefined()
    expect(reportData.minValue).toEqual(13.1)
    expect(reportData.maxValue).toEqual(15.2)
    expect(reportData.avgValue).toEqual(14.5)
})

test('should return report error 400', async () => {
    const responsePromise = new Promise<ResponseList<CompanyDTO>>((resolve) =>
        resolve(new ResponseList<CompanyDTO>([new CompanyDTO('test', 1, new Date())], 200, new Summary()))
    )
    jest.spyOn(companyRepositoryMock, 'getByFilter').mockReturnValueOnce(responsePromise)
    let error
    try {
        await companyController.getReport(null)
    } catch (err) {
        error = err
    }
    expect(error).toBeDefined()
    expect(error.code).toEqual(400)
    expect(error.message).toBeDefined()
    expect(error.stack).toBeDefined()
})

test('should return report error 500', async () => {
    jest.resetAllMocks()
    jest.spyOn(companyRepositoryMock, 'getByFilter').mockReturnValueOnce(null)
    let error
    try {
        await companyController.getReport(new CompanyDTO('PLANK', 1, new Date()))
    } catch (err) {
        error = err
    }
    expect(error).toBeDefined()
    expect(error.code).toEqual(500)
    expect(error.message).toBeDefined()
    expect(error.stack).toBeDefined()
})
