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

//decode the token
export async function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey)

    return { valid: true, expired: false, decoded }
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        valid: false,
        expired: err.message === 'jwt token Expired',
        decoded: null,
      }
    }
  }
}
