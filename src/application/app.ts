import express from 'express'

export class AppRoutes {
    private app

    constructor(private routes = null) {
        this.startApp(this.routes)
    }

    private startApp(routes) {
        this.app = express()

        this.app.get('/health-check', (req, res) => {
            res.json({ 'app-staus': 'running' })
        })

        if (routes) this.app.use(routes)

        this.app.listen(process.env['PORT'], () => {
            console.log(`API is running. Port: ${process.env['PORT']}`)
        })
    }
}
