import { IBaseDomain } from '../../../shared/interfaces/ibase-domain'
import { Stock } from '../stock/stock-domain'

export class CompanyDomain implements IBaseDomain {
    constructor(
    public name: string,
    public id: number,
    public foundationDate: Date,
    private stockHistory: Stock[] = null
    ) {}

    addStockHistory(newStock: Stock): void {
        if (this.isStockValid(newStock)) {
            this.getStockHistory().push(newStock)
        }
    }

    getStockHistory(): Stock[] {
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

    isStockValid(newStock: Stock): boolean {
        const isValid: boolean =
      !this.getStockHistory().some((stock) => stock.marketDate.toJSON() === newStock.marketDate.toJSON()) &&
      newStock.price > 0
        return isValid
    }
}
