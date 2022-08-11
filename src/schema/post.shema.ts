import { ref, object, string } from 'yup'

const payload = {
  body: object({
    title: string().required('Title is required'),
    body: string().required('Description required').min(10, 'to short'),
  }),
}
const params = {
  params: object({
    postId: string().required('Post id is required'),
  }),
}

export const createPostScehma = object({
  ...payload,
})

export const updatePostScehma = object({
  ...params,
  ...payload,
})
export const deletePostScehma = object({
  ...params,
})
