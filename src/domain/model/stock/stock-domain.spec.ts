import { StockDomain } from '@domain/model/stock/stock-domain'

test('shoud create a Stock', () => {
    const stock: StockDomain = new StockDomain(new Date(), 12.3)
    expect(stock).toBeDefined()
})
