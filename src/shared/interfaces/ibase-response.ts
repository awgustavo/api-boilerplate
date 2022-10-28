export interface IResponse<T> {
  data: T;
  statusCode: number;
  error?: Error;
}
