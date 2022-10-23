import express, { Request, Response, Router } from 'express'
import { IResponse } from '../../interfaces/ibase-response'
import { IRESTHandler } from './irest-handler'

type FuncType<T> = (T) => IResponse<T>;

export class ExpressHandler implements IRESTHandler {
    router: Router
    private app

    constructor() {
        this.app = express()

        this.app.get('/health-check', (req, res) => {
            res.json({ 'app-staus': 'running' })
        })

        this.router = express.Router()
    }
    getRouter() {
        throw new Error('Method not implemented.')
    }

    public async handler<T>(request: Request, response: Response, controllerFunction: FuncType<T>) {
        try {
            const controllerResponse: IResponse<T> = await controllerFunction(request.body ?? request.query)
            return response.json(controllerResponse)
        } catch (err) {
            console.error(err.stack)
            response.status(500).send(`Internal error: ${err.message}`)
        }
    }

    public async registerRoutes<T>(method: string, path, controllerFunction: FuncType<T>) {
        const router = express.Router()
        router[method](path, (request: Request, response: Response) => {
            return this.handler<T>(request, response, controllerFunction)
        })
        this.addRoutes(router)
    }

    private addRoutes(routes: Router) {
        this.app.use('/api', routes)
    }

    public startAPI(port: number) {
        this.app.listen(port, () => {
            console.log(`API is running. Port: ${port}`)
        })
    }
}
