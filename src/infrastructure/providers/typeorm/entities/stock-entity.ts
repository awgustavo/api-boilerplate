import { IBaseDTO } from '@shared/interfaces/ibase-dto'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CompanyEntity } from './company-entity'

@Entity('stock')
export class StockEntity implements IBaseDTO {
  @PrimaryGeneratedColumn()
      id: number

  @Column()
      price: number

  @Column()
      marketDate: Date

  @ManyToOne(() => CompanyEntity, (company) => company.stockHistory)
      company: CompanyEntity
}
