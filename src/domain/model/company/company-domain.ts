import { IBaseDomain } from '@shared/interfaces/ibase-domain'
import { StockDomain } from '@domain/model/stock/stock-domain'

export class CompanyDomain implements IBaseDomain {
    constructor(
    public name: string,
    public id: number,
    public foundationDate: Date,
    private stockHistory: StockDomain[] = null
    ) {}

    addStockHistory(newStock: StockDomain): void {
        if (this.isStockValid(newStock)) {
            this.getStockHistory().push(newStock)
        }
    }

    getStockHistory(): StockDomain[] {
        if (!this.stockHistory) {
            this.stockHistory = []
        }
        return this.stockHistory
    }

    getAvgPrice(): number {
        const avg = this.getStockHistory().reduce((total, next) => total + next.price, 0) / this.getStockHistory().length
        return Math.round(avg * 100) / 100
    }

    getMaxPrice(): number {
        return this.getStockHistory()
            .map((m) => m.price)
            .sort()[this.getStockHistory().length - 1]
    }

    getMinPrice(): number {
        return this.getStockHistory()
            .map((m) => m.price)
            .sort()[0]
    }

    getLastPrice(): number {
        const lastDate: string = this.getStockHistory()
            .map((m) => m.marketDate.toJSON())
            .sort()[this.getStockHistory().length - 1]

        return this.getStockHistory().find((m) => m.marketDate.toJSON() === lastDate).price
    }

    isStockValid(newStock: StockDomain): boolean {
        const isValid: boolean =
      !this.getStockHistory().some((stock) => stock.marketDate.toJSON() === newStock.marketDate.toJSON()) &&
      newStock.price > 0
        return isValid
    }
}
