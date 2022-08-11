import { get } from 'lodash'
import { Request, Response, NextFunction } from 'express'
import { decode } from '../utils/jwt.utils'
import { reIsssueAccessToken } from '../service/session.service'

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = await get(req, 'headers.authrization', '').replace(
    /^Bearer\s/,
    ''
  )
  if (!accessToken) return next()
  console.log('AccessToken==>', accessToken)

  const refreshToken = await get(req, 'headers.x-refresh')

  const { decoded, expired } = decode(accessToken) as any

  if (decoded) {
    //@ts-ignore
    req.user = decoded
    return next()
  }
  console.log('refreshToken==>', refreshToken)

  if (expired && refreshToken) {
    const newAccessToken = await reIsssueAccessToken(refreshToken)
    if (newAccessToken) {
      //set the token in custom headers
      res.setHeader('x-access-token', newAccessToken)
      const { decoded } = decode(newAccessToken) as any
      //@ts-ignore
      req.user = decoded
    }
    next()
  }
  next()
}

export default deserializeUser
