import { CompanyDomain } from '@domain/model/company/company-domain'

export class EtfDomain {
    constructor(public name: string, public companies: CompanyDomain[], public price: number) {}

    // getAvgPrice(): number {

    // }
}
