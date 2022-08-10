import { AnySchema } from 'yup'
import { Request, Response, NextFunction } from 'express'
import log from '../logger'

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        name: req.body,
        email: req.body,
        params: req.params,
      })
      return next()
    } catch (err) {
      log.error(err)
      return res.status(400).send('ERROR In validating')
    }
  }

export default validate
