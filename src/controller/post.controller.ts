import { Response, Request } from 'express'
import { get } from 'lodash'
import {
  createPost,
  updatePost,
  findPost,
  deletePost,
} from '../service/post.service'

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

export async function updatePostHandler(req: Request, res: Response) {
  try {
    const userId = get(req, 'user._id')

    const postId = get(req, 'params.postId')

    //valid post
    const post: any = await findPost({ _id: postId })
    if (!post) {
      return res.sendStatus(404)
    }
    //auth
    if (String(post.user) !== userId) {
      return res.sendStatus(401)
    }
    const update = req.body

    //update
    const updatedPost = await updatePost({ _id: postId }, update, { new: true })
    return res.send(updatedPost)
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
      throw new Error(err.message)
    }
  }
}
export async function getPostHandler(req: Request, res: Response) {
  try {
    const postId = get(req, 'params.postId')
    const post: any = await findPost({ _id: postId })
    if (!post) {
      return res.sendStatus(404)
    }

    return res.send(post)
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
      throw new Error(err.message)
    }
  }
}

export async function deletePostHandler(req: Request, res: Response) {
  try {
    const userId = get(req, 'user._id')

    const postId = get(req, 'params.postId')

    //valid post
    const post: any = await findPost({ _id: postId })
    if (!post) {
      return res.sendStatus(404)
    }
    //auth
    if (String(post.user) !== userId) {
      return res.sendStatus(401)
    }

    return res.sendStatus(200)
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
      throw new Error(err.message)
    }
  }
}
