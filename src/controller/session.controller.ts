import { Request, Response } from 'express'
import { createSession } from '../service/session.service'
import { validateUserPassword } from '../service/user.service'
import { createAccessToken } from '../service/session.service'
import config from 'config'
import { sign } from '../utils/jwt.utils'

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
