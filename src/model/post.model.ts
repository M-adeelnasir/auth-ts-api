import mongoose from 'mongoose'
import { UserDocument } from './user.model'

export interface PostDocument extends mongoose.Document {
  title: string
  body: string
  user: UserDocument['_id']
  createdAt: Date
  updatedAt: Date
}

const postScema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },

  { timestamps: true }
)

const Post = mongoose.model<PostDocument>('Post', postScema)

export default Post
