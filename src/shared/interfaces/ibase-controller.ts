import { IBaseDTO } from './ibase-dto'
import { IResponse } from './ibase-response'
import { Request, Response } from 'express'

export interface IBaseController {
  getByFilter(baseDTO: IBaseDTO): IResponse<IBaseDTO>;
}
