import dotenv from 'dotenv'
import { AppRoutes } from './app'

class Server {
    constructor() {
        this.initiateServer()
    }

    initiateServer() {
        dotenv.config({ path: '.env' })
        new AppRoutes()
    }
}
new Server()
