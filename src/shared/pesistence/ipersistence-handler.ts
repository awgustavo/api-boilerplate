import { IBaseDTO } from '../interfaces/ibase-dto'

export interface IPersistenceHandler {
  save(entity: IBaseDTO, entityName: string);
  update(entity: IBaseDTO, id: string | number, entityName: string);
  getByFilter(entity: IBaseDTO, entityName: string);
  getOneByID(id: string | number, entityName: string);
  delete(id: string | number, entityName: string);
}
