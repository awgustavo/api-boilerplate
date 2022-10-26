import { IRESTHandler } from '../shared/api/irest-handler'
import { IBaseController } from '../shared/interfaces/ibase-controller'
import { IBaseDTO } from '../shared/interfaces/ibase-dto'
import { IBaseRepository } from '../shared/interfaces/ibase-repositóry'
import { IBaseService } from '../shared/interfaces/ibase-service'
import { IPersistenceHandler } from '../shared/pesistence/ipersistence-handler'
import { MongoDBFactory } from '../shared/pesistence/mongodb/mongodb-factory'

interface IBaseControllerType<DTO extends IBaseDTO> {
  new (service: IBaseService<DTO>, restHandler: IRESTHandler): IBaseController;
}

interface IBaseServiceType<DTO extends IBaseDTO> {
  new (repository: IBaseRepository<DTO>): IBaseService<DTO>;
}

interface IBaseRepositoryType<DTO extends IBaseDTO> {
  new (persistence: IPersistenceHandler, entityName: string): IBaseRepository<DTO>;
}

export class APIModules {
    static resgisterModules<DTO extends IBaseDTO>(
        controller: IBaseControllerType<DTO>,
        service: IBaseServiceType<DTO>,
        repository: IBaseRepositoryType<DTO>,
        restHandler: IRESTHandler,
        persistence: IPersistenceHandler,
        persistenceFactory: MongoDBFactory,
        db,
        entityName: string
    ): IBaseController {
        persistenceFactory.createCollection(db, entityName)
        return new controller(new service(new repository(persistence, entityName)), restHandler)
    }
}
