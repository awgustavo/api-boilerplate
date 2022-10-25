import { IBaseDTO } from "../../shared/interfaces/ibase-dto";

export class CompanyDTO implements IBaseDTO {
  constructor(public name: string, public id: number, public foundationDate: Date) {}
}
