export default function globalErrorHandler(err, req, resp, next) {
  console.log(`from the Universal Error handler err: ${err}`);
  const status = err.statusCode || 500;
  resp.status(status).json({ message: err.message, success: false });
}
