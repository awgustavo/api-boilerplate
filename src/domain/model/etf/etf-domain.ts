import { CompanyDomain } from '@domain/model/company/company-domain'

export class EtfDomain {
    constructor(public name: string, public companies: CompanyDomain[], public price: number) {}

    getAvgPrice(): number {
        const avg =
      this.companies.reduce((previous, next) => {
          return previous + next.getLastPrice()
      }, 0) / this.companies.length
        return Math.round(avg * 100) / 100
    }
}
