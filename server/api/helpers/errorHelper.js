function createError(status_code, message) {
  const error = new Error(message)
  error.status_code = status_code
  return error
}

export {createError}