class customError extends Error {
  constructor(err, status) {
    super(err)
    this.status = status
  }
}

const createCustomError = (err, status) => {
  return new customError(err, status)
}

export { customError, createCustomError }
