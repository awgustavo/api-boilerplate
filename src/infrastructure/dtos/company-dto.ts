import { IBaseDTO } from '@shared/interfaces/ibase-dto'
import { StockDTO } from '@infrastructure/dtos/stock-dto'

export class CompanyDTO implements IBaseDTO {
    constructor(
    public name: string,
    public id: number,
    public foundationDate: Date,
    public stockHistory: StockDTO[] = null
    ) {}
}
