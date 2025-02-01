export function throwCustomError(
  message = "Some error occured",
  status = null,
  shouldReturnInstead = false,
  next = undefined
) {
  const error = new Error(message);
  if (status) error.statusCode = 400;
  if (shouldReturnInstead) return next?.(error);
  throw error;
}
