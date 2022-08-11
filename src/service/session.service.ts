import { LeanDocument } from 'mongoose'
import Session, { SessionDocument } from '../model/session.model'
import config from 'config'
import { UserDocument } from '../model/user.model'
import { sign } from '../utils/jwt.utils'

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent })
  return session.toJSON()
}

export async function createAccessToken(user: any, session: any) {
  //build and return access token
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokenTtl') }
  )
  return accessToken
}
