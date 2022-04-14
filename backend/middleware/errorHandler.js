import { customError } from "../utils/customErrors.js"

export const errorHandler = (err, req, res, next) => {
  if (err instanceof customError) {
    return res.status(err.status).json({ msg: err.message })
  }
  return res.status(500).json(err)
}
