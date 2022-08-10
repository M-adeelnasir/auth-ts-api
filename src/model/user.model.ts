import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'

export interface UserDocument extends mongoose.Document {
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  comparedPassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  const user = this as UserDocument
  if (!user.isModified('password')) return next()

  const salt = await bcrypt.genSalt(10)

  const hash = await bcrypt.hashSync(user.password, salt)

  user.password = hash
  return next()
})

userSchema.methods.comparedPassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument
  return bcrypt.compare(candidatePassword, user.password).catch((err) => false)
}

const User = mongoose.model<UserDocument>('User', userSchema)

export default User
