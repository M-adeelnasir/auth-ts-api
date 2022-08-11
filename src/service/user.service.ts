import User, { UserDocument } from '../model/user.model'
import { DocumentDefinition } from 'mongoose'
import { omit } from 'lodash'

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input)
  } catch (error) {
    throw new Error('ERROR 400')
  }
}

export async function validateUserPassword({
  email,
  password,
}: {
  email: UserDocument['email']
  password: string
}) {
  const user = await User.findOne({ email })
  if (!user) {
    return false
  }

  const isValid = await user.comparedPassword(password)

  if (!isValid) {
    return false
  }
  return omit(user.toJSON(), 'password')
}
