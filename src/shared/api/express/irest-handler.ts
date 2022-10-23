import { Request, Response, Router } from 'express'
import { IResponse } from '../../interfaces/ibase-response'

type FuncType<T> = (T) => IResponse<T>;

export interface IRESTHandler {
  router: Router;

  handler<T>(request: Request, response: Response, controllerFunction: FuncType<T>);

  registerRoutes<T>(method: string, path, controllerFunction: FuncType<T>);

  getRouter();
  startAPI(port: number);
}
