export class APIError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpCode;
    public readonly message: string;
    /**
     * @namespace isOperational
     * @description it will be true if the error is from coding prespective and false if it is http error
     */
    public readonly isOperational: boolean;

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

