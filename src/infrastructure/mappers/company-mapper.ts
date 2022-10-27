import { CompanyDomain } from '@domain/model/company/company-domain'
import { StockDomain } from '@domain/model/stock/stock-domain'
import { IBaseMapper } from '@shared/interfaces/ibase-mapper'
import { CompanyDTO } from '@infrastructure/dtos/company-dto'
import { StockDTO } from '@infrastructure/dtos/stock-dto'

export class CompanyMapper implements IBaseMapper {
    toDTO(domain: CompanyDomain): CompanyDTO {
        const dto: CompanyDTO = new CompanyDTO(
            domain.name,
            domain.id,
            domain.foundationDate,
            domain.getStockHistory().map((stock: StockDomain) => new StockDTO(stock.price, stock.marketDate))
        )
        return dto
    }

    toDomain(dto: CompanyDTO): CompanyDomain {
        const domain: CompanyDomain = new CompanyDomain(
            dto.name,
            dto.id,
            dto.foundationDate,
            dto.stockHistory.map((stock: StockDTO) => new StockDomain(stock.marketDate, stock.price))
        )
        return domain
    }
}
