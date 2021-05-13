export class APIError extends Error {

    public readonly name: string;

    public readonly httpCode: HttpCode;

    public readonly message: string;

    public readonly isOperational: boolean;

    /**
     *
     * @param name of the server error such Not Found
     * @param httpCode code of the error such 400 for bad request
     * @param message for the client
     * @param description
     * @param isOperational it will be true if the error is from coding prespective and false if it is http error
     */
    constructor(name: string, httpCode: HttpCode, message: string, description: string, isOperational: boolean) {
        super(description);
        // restore prototype chain
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.httpCode = httpCode;
        this.message = message;
        this.isOperational = isOperational;

        // capture error trace
        Error.captureStackTrace(this);
    }
}

/**
 * @namespace HttpCode
 * @description enum holds http codes with its names
 */

export enum HttpCode {
    Success = 200,
    Created = 201,
    Accepted = 202,
    BadRequest = 400,
    NotAuthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    NotAccepted = 406,
}


 class ErrorHandler {

    public isTrustedError(error: Error): boolean {
        if (!(error instanceof APIError)) {
            // then the error is not trusted so we need to stop the process
            // return false
            return false;
        } else return error.isOperational;
    }
}

// making Error handler singleton 'only one instance of it can be created'
export const handler = new ErrorHandler();
