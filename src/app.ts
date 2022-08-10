import express from 'express'
import config from 'config'
import log from './logger'
import connectDb from './db'
import routes from './routes'

const port = config.get('port') as number
const host = config.get('host') as string

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = app.listen(port, () => {
  log.info(`Server is listing at http://${host}:${port}`)
  //   connectDb()
  routes(app)
})

process.on('unhandledRejection', (err) => {
  log.error(`INTERNAL SERVER ERROR ==> ${err}`)
  server.close(process.exit(1))
})
