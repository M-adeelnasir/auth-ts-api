import { createUser } from '../service/user.service'
import { Request, Response } from 'express'
import { omit } from 'lodash'
import log from '../logger'

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body)
    return res.send(omit(user.toJSON(), 'password'))
  } catch (err: unknown) {
    if (err instanceof Error) {
      log.error(err.message)
      return res.status(409).send('User Create Failed')
    }
  }
}
