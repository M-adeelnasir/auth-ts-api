import { Express, Response, Request } from 'express'
import { createUserHandler } from './controller/user.controller'
import { createUserSessionHandler } from './controller/session.controller'
import validate from './middleware/validateRequest'
import { createUserScehma, createUserSessionSchema } from './schema/user.schema'

export default function (app: Express) {
  app.get('/', (req: Request, res: Response) => res.sendStatus(200))

  //post /user/regisetr
  app.post('/api/users', validate(createUserScehma), createUserHandler)

  //post  /login
  app.post(
    '/api/sessions',
    validate(createUserSessionSchema),
    createUserSessionHandler
  )
}
