import { FilterQuery } from 'mongoose'
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
export async function reIsssueAccessToken(refeshToken: string) {
  //decode the refresh token

  const { decoded } = (await decode(refeshToken)) as any
  if (!decoded || !get(decoded, '_id')) {
    return false
  }

  //get the session
  const session = await Session.findById(get(decoded, '_id'))
  console.log(session)
  console.log('valid', !session?.valid)

  //make sure that the session is still valid
  //   console.log(!session)
  if (!session || !session?.valid) return false

  //find the user
  const user = await User.findById({ _id: session.user }).lean()
  if (!user) return false

  const accessToken = await createAccessToken(user, session)

  return accessToken
}

//update session on logout
export async function updateSession(query: any, data: any) {
  await Session.findByIdAndUpdate(query, data)
}

//get all sessions
export async function findSessions(query: any) {
  return await Session.find(query).lean()
}
