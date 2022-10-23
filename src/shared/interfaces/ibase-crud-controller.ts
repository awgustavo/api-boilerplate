import { IBaseController } from './ibase-controller'
import { IBaseDTO } from './ibase-dto'
import { IResponse } from './ibase-response'

export interface IBaseCrudController extends IBaseController {
  create(): IResponse<IBaseDTO>;
  update(): IResponse<IBaseDTO>;
  getByID(): IResponse<IBaseDTO>;
  delete(): IResponse<void>;
}
