export const customError = (res, message, error) => {
  return res.status(error).send(message);
};
