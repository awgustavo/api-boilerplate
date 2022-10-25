import { IResponse } from '../interfaces/ibase-response'

type FuncType<T> = (T) => IResponse<T>;

export interface IRESTHandler {
  handler<T>(request, response, controllerFunction: FuncType<T>);

  registerRoutes<T>(method: string, path, controllerFunction: FuncType<T>);

  startAPI(port: number);
}
