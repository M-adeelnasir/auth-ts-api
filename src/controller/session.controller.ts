import { Request, Response } from 'express'
import { createSession } from '../service/session.service'
import { validateUserPassword } from '../service/user.service'

export async function createUserSessionHandler(req: Request, res: Response) {
  //validate email and password
  const user = await validateUserPassword(req.body)
  if (!user) {
    return res.status(401).send('Invalid Credentials')
  }
  //create session
  const session = await createSession(user._id, req.get('user-agent') || '')
  //create access token
  //create refresh token
  //send refresh and access token
}