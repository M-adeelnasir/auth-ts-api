import { Request, Response } from 'express'
import { createSession } from '../service/session.service'
import { validateUserPassword } from '../service/user.service'
import { createAccessToken } from '../service/session.service'
import config from 'config'
import { get } from 'lodash'
import { sign } from '../utils/jwt.utils'
import log from '../logger'
import { updateSession, findSessions } from '../service/session.service'

export async function createUserSessionHandler(req: Request, res: Response) {
  try {
    //validate email and password
    const user = await validateUserPassword(req.body)
    if (!user) {
      return res.status(401).send('Invalid Credentials')
    }
    //create session
    const session = await createSession(user._id, req.get('user-agent') || '')

    //create access token
    const accessToken = await createAccessToken(user, session)

    //create refresh token
    const refreshToken = await sign(session, {
      expiresIn: config.get('jwtRefreshTokenTtl'), // 1year
    })

    //send refresh and access token
    return res.send({ accessToken, refreshToken })
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }
  }
}

//logout and invalidate user
export async function invalidateUserSessionHandler(
  req: Request,
  res: Response
) {
  try {
    const sessionId = get(req, 'user.session')
    await updateSession({ _id: sessionId }, { valid: false })

    return res.sendStatus(200)
  } catch (err) {
    if (err instanceof Error) {
      log.error(err.message)
      throw new Error(err.message)
    }
  }
}

export async function getUserSessionHandler(req: Request, res: Response) {
  try {
    const userId = get(req, 'user._id')

    const sessions = await findSessions({ user: userId, valid: true })
    // console.log(sessions)
    return res.send(sessions)
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
      throw new Error(err.message)
    }
  }
}
