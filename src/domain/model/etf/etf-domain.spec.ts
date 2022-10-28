import { CompanyDomain } from '@domain/model/company/company-domain'
import { StockDomain } from '@domain/model/stock/stock-domain'
import { EtfDomain } from '@domain/model/etf/etf-domain'

const googleStocks: StockDomain[] = [
    new StockDomain(new Date(2022, 10, 1), 13.2),
    new StockDomain(new Date(2022, 10, 2), 14.5),
    new StockDomain(new Date(2022, 10, 3), 15.5),
    new StockDomain(new Date(2022, 10, 4), 14.4),
    new StockDomain(new Date(2022, 10, 5), 14.9),
]

const facebookStocks: StockDomain[] = [
    new StockDomain(new Date(2022, 10, 1), 19.2),
    new StockDomain(new Date(2022, 10, 2), 18.5),
    new StockDomain(new Date(2022, 10, 3), 18.5),
    new StockDomain(new Date(2022, 10, 4), 19.4),
    new StockDomain(new Date(2022, 10, 5), 16.9),
]

const companies = [
    new CompanyDomain('google', 1, new Date(2022, 10, 26), googleStocks),
    new CompanyDomain('meta', 1, new Date(2022, 10, 26), facebookStocks),
]

test('should create a etf', () => {
    const etf: EtfDomain = new EtfDomain('etf01', companies, 15.5)
    expect(etf).toBeDefined()
})

test('should get the avg price of a etf', () => {
    const etf: EtfDomain = new EtfDomain('etf01', companies, 15.5)
    const avgPrice = etf.getAvgPrice()

    expect(avgPrice).toBeDefined()
    expect(avgPrice).toEqual(15.9)
})
