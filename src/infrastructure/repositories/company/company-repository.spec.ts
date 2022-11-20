import { CompanyDTO } from '@infrastructure/dtos/company-dto'
import { StockDTO } from '@infrastructure/dtos/stock-dto'
import { MongoDBHandler } from '@shared/infrastructure/persistence/mongodb/mongodb-handler'
import { ResponseList } from '@shared/result/response-list'
import { Summary } from '@shared/result/summary'
import { CompanyRepository } from '@infrastructure/repositories/company/company-repository'

jest.mock('@shared/infrastructure/persistence/mongodb/mongodb-handler')

const MongoDBHandlerMock = MongoDBHandler as jest.Mock<MongoDBHandler>
const mongoDBHandlerMock = new MongoDBHandlerMock()
const companyRepository = new CompanyRepository(mongoDBHandlerMock, 'company')

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
    expect(companyRepository).toBeDefined()
})

test('shoud create a respository', async () => {
    const promiseCompany = new Promise<CompanyDTO[]>((resolve) => {
        resolve(response.data)
    })
    jest.spyOn(mongoDBHandlerMock, 'getByFilter').mockReturnValueOnce(promiseCompany)
    const result = companyRepository.getByFilter(new CompanyDTO('test', 1, new Date()))
    expect(result).toBeDefined()
})
