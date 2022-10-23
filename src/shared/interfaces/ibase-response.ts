import { IBaseDTO } from './ibase-dto'

export interface IResponse<T> {
  data: T;
  statusCode: number;
  error?: Error;
}
