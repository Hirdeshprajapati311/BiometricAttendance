export class ApiError extends Error {
  constructor(statusCode, message, success) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.contructor);
  }
}
