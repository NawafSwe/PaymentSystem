class APIError extends Error {
    public readonly name: string;
    public readonly httpCode: number;
    public readonly isOperational: boolean;

    constructor(name: string, httpCode: number, description: string, isOperational: boolean) {
        super(description);
        // restore prototype chain
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;

        // capture error trace
        Error.captureStackTrace(this);
    }
}
