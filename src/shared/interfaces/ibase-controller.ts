import { IResponse } from './ibase-response'

export interface IBaseController {
  getByFilter(): IResponse;
}
