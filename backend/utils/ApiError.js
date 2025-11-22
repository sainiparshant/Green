class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went Wrong",
        errors=[],
    ){
        super(message);
        this.statusCode = statusCode,
        this.message = message,
        this.errors = errors,
        this.success = false
    }
}

export {ApiError};