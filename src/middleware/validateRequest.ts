import { AnySchema } from 'yup'
import { Request, Response, NextFunction } from 'express'
import log from '../logger'

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      return next()
    } catch (err: unknown) {
      if (err instanceof Error) {
        log.error(err.message)
        return res.status(400).send('ERROR In validating')
      }
    }
  }

export default validate
