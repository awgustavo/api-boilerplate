import { IRESTHandler } from '../shared/api/express/irest-handler'
import { IBaseController } from '../shared/interfaces/ibase-controller'
import { IBaseRepository } from '../shared/interfaces/ibase-repositóry'
import { IBaseService } from '../shared/interfaces/ibase-service'

interface IBaseControllerType {
  new (service: IBaseService, restHandler: IRESTHandler): IBaseController;
}

interface IBaseServiceType {
  new (repository: IBaseRepository): IBaseService;
}

interface IBaseRepositoryType {
  new (): IBaseRepository;
}

export class APIModules {
    static resgisterModules(
        controller: IBaseControllerType,
        service: IBaseServiceType,
        repository: IBaseRepositoryType,
        restHandler: IRESTHandler
    ): IBaseController {
        return new controller(new service(new repository()), restHandler)
    }
}
