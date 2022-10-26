import { Stock } from './stock-domain'

test('shoud create a Stock', () => {
    const stock: Stock = new Stock(new Date(), 12.3)
    expect(stock).toBeDefined()
})
