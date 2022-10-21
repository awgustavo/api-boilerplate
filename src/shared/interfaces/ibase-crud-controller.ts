import { IBaseController } from './ibase-controller'
import { IResponse } from './ibase-response'

export interface IBaseCrudController extends IBaseController {
  create(): IResponse;
  update(): IResponse;
  getByID(): IResponse;
  delete(): IResponse;
}
