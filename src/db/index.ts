import mongoose from 'mongoose'
import log from '../logger'
import config from 'config'

const mongoUri = config.get('dbUri') as string

const connectDb = async () => {
  const conn = await mongoose.connect(mongoUri)
  log.info(`Database is Connected at ${conn.connection.host}`)
}

export default connectDb
