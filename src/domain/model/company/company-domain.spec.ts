import { Stock } from '../stock/stock-domain'
import { CompanyDomain } from './company-domain'

let company

beforeEach(() => {
    company = new CompanyDomain('PLANK', 31, new Date())

    company.addStockHistory(new Stock(new Date(2022, 10, 1), 13.2))
    company.addStockHistory(new Stock(new Date(2022, 10, 2), 14.5))
    company.addStockHistory(new Stock(new Date(2022, 10, 3), 15.5))
    company.addStockHistory(new Stock(new Date(2022, 10, 4), 14.4))
    company.addStockHistory(new Stock(new Date(2022, 10, 5), 14.9))
})

test('should create a company', () => {
    const companyNew = new CompanyDomain('PLANK', 31, new Date(2022, 10, 1))
    expect(companyNew).toBeDefined()
    expect(companyNew.name).toEqual('PLANK')
    expect(companyNew.id).toEqual(31)
})

test('should add a stock to the history', () => {
    const companyNew = new CompanyDomain('PLANK', 31, new Date())

    const stock: Stock = new Stock(new Date(), 13.2)
    companyNew.addStockHistory(stock)
    companyNew.addStockHistory(stock)

    expect(companyNew.getStockHistory().length).toEqual(1)
})

test('should get a company avg price to the history', () => {
    expect(company.getAvgPrice()).toEqual(14.5)
})

test('should get a company max price to the history', () => {
    expect(company.getMaxPrice()).toEqual(15.5)
})

test('should get a company max price to the history', () => {
    expect(company.getMinPrice()).toEqual(13.2)
})

test('should check if stock is valid to be addes to the history', () => {
    const stock: Stock = new Stock(new Date(2022, 10, 2), 0)
    expect(company.isStockValid(stock)).toBeFalsy()
})
