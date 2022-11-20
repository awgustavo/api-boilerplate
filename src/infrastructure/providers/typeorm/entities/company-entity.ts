import { IBaseDTO } from '@shared/interfaces/ibase-dto'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { StockEntity } from './stock-entity'

@Entity('company')
export class CompanyEntity implements IBaseDTO {
  @PrimaryGeneratedColumn()
      id: number

  @Column()
      name: string

  @Column()
      lastName: string

  @Column()
      foundationDate: Date

  @OneToMany(() => StockEntity, (stock) => stock.company)
  public stockHistory: StockEntity[] = null
}
