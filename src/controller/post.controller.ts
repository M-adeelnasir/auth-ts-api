import { Response, Request } from 'express'
import { get } from 'lodash'

export async function createPostHandler(req: Request, res: Response) {
  try {
    const userId = get(req, 'user._id')

    const post = await createPost({ ...req.body, user: userId })
    return res.send(post)
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
      throw new Error(err.message)
    }
  }
}
