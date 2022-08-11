import { Express, Response, Request } from 'express'
import { createUserHandler } from './controller/user.controller'
import { createUserSessionHandler } from './controller/session.controller'
import { createUserScehma, createUserSessionSchema } from './schema/user.schema'
import { validate, requireSignIn } from './middleware'
import { invalidateUserSessionHandler } from './controller/session.controller'

export default function (app: Express) {
  app.get('/', (req: Request, res: Response) => res.sendStatus(200))

  //post /user/regisetr
  app.post('/api/users', validate(createUserScehma), createUserHandler)

  //post  /login
  app.post(
    '/api/session',
    validate(createUserSessionSchema),
    createUserSessionHandler
  )

  //logout
  app.delete('/api/session', requireSignIn, invalidateUserSessionHandler)

  app.get('/api/session', requireSignIn, (req: Request, res: Response) =>
    res.sendStatus(200)
  )
}
