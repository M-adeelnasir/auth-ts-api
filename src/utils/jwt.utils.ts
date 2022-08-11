import jwt from 'jsonwebtoken'
import config from 'config'

const privateKey = config.get('jwtSecretKey') as string

export async function sign(
  object: Object,
  options?: jwt.SignOptions | undefined
) {
  return jwt.sign(object, privateKey, options)
}
