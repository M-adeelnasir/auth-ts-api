import { Express, Response, Request } from 'express'

export default function (app: Express) {
  app.get('/hello', (req: Request, res: Response) => res.sendStatus(200))
}
