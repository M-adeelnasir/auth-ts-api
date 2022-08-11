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
    const decoded = await jwt.verify(token, privateKey)

    return { valid: true, expired: false, decoded }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err)
      return {
        valid: false,
        expired: err.message === 'jwt expired',
        decoded: null,
      }
    }
  }
}
