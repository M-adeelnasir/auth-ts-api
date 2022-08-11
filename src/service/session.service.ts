import Session from '../model/session.model'
import config from 'config'
import { decode, sign } from '../utils/jwt.utils'
import { get } from 'lodash'
import User from '../model/user.model'
// import { findUser } from './user.service

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

//re issue the access token
export async function reIsssueAccessToken({
  refeshToken,
}: {
  refeshToken: string
}) {
  //decode the refresh token
  const { decoded } = (await decode(refeshToken)) as any
  if (!decoded || get(decoded, '_id')) {
    return false
  }

  //get the session
  const session = await Session.findById(get(decoded, '_id'))

  //make sure that the session is still valid
  if (!session || !session?.valid) return false

  //find the user
  const user = await User.findById({ _id: session.user }).lean()
  if (!user) return false

  const accessToken = await createAccessToken(user, session)

  return accessToken
}
