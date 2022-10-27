import { IBaseController } from '@shared/interfaces/ibase-controller'
import { IBaseDTO } from '@shared/interfaces/ibase-dto'
import { IResponse } from '@shared/interfaces/ibase-response'

export interface IBaseCrudController extends IBaseController {
  create(): IResponse<IBaseDTO>;
  update(): IResponse<IBaseDTO>;
  getByID(): IResponse<IBaseDTO>;
  delete(): IResponse<void>;
}
