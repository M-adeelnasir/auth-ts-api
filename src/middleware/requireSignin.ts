import { get } from 'lodash'
import { Request, Response, NextFunction } from 'express'
import log from '../logger'
const requireSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = get(req, 'user')
    console.log('Required Sign in', user)

    if (!user) {
      return res.sendStatus(403)
    }

    next()
  } catch (err) {
    if (err instanceof Error) {
      log.error(err.message)
    }
  }
}

export default requireSignIn
