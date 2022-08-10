import { Express, Response, Request } from 'express'
import { createUserHandler } from './controller/user.controller'
import validate from './middleware/validateRequest'
import { createUserScehma } from './schema/user.schema'

export default function (app: Express) {
  app.get('/', (req: Request, res: Response) => res.sendStatus(200))

  //post /user/regisetr
  app.post('/api/users', validate(createUserScehma), createUserHandler)
}
