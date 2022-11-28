import { IResponse } from '@shared/interfaces/ibase-response'
import express, { Request, Response, Router } from 'express'
import { IRESTHandler } from '@shared/infrastructure/api/irest-handler'
import { IBaseAuthentication } from '@shared/interfaces/ibase-authentication'

type FuncType<T> = (body, params) => IResponse<T>;

export class ExpressHandler implements IRESTHandler {
    private app

    constructor(private baseAuthentication: IBaseAuthentication) {
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.urlencoded())

        this.app.get('/health-check', (req, res) => {
            res.json({ 'app-staus': 'running' })
        })
    }

    public async handler<T>(request: Request, response: Response, controllerFunction: FuncType<T>) {
        try {
            const body = Object.keys(request.body).length > 0 ? request.body : request.query
            const controllerResponse: IResponse<T> = await controllerFunction(body, request.params)
            return response.json(controllerResponse)
        } catch (err) {
            console.error(err.stack)
            response.status(500).send(`Internal error: ${err.message}`)
        }
    }

    public async registerRoutes<T>(method: string, path: string, controllerFunction: FuncType<T>) {
        const router = express.Router()
        router[method](path, this.baseAuthentication.validateToken, (request: Request, response: Response) => {
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
