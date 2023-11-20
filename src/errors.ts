abstract class CustomError extends Error {
  abstract readonly statusCode: number;

  constructor(message: string) {
    super(message);
  }
}

export class BadRequestError extends CustomError {
  private static _defaultMessage: string = 'Bad Request';
  private static readonly _statusCode: number = 400;
  private readonly _code: number;

  constructor(params: { code?: number; message?: string }) {
    const { code, message } = params;
    super(message || BadRequestError._defaultMessage);
    this._code = code || BadRequestError._statusCode;
  }

  get statusCode() {
    return this._code;
  }
}

export const MAXIMUM_REQUESTS_REACHED_MESSAGE = 'Maximum requests reached';
