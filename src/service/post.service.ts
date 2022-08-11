import { DocumentDefinition, FilterQuery, QueryOptions } from 'mongoose'

import Post, { PostDocument } from '../model/post.model'
export async function createPost(input: DocumentDefinition<PostDocument>) {
  return await Post.create(input)
}

export async function updatePost(query: any, data: any, options: any) {}
export async function deletePost(input: any) {}

//get single post
export async function findPost(
  query: FilterQuery<PostDocument>,
  options: QueryOptions = { lean: true }
) {
  return await Post.findOne(query, {}, options)
}
