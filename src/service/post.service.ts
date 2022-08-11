export async function createPost(input: any) {
  return await Post.create(input)
}
