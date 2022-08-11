import jwt from 'jsonwebtoken'
import config from 'config'

const privateKey = config.get('privateKey') as string

export async function sign(
  object: Object,
  options?: jwt.SignOptions | undefined
) {
  const token = jwt.sign(object, privateKey, options)
  return token
}
