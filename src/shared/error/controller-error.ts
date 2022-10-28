export class ControllerError implements Error {
    public name = 'Controller Error'
    constructor(public message: string, public stack: string, public code: number) {}
}
