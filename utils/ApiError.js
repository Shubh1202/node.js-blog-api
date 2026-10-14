const { httpStatusCode } = require("../helper/httpStatusCode")

class ApiError extends Error {
    constructor(errorObj) {
        const { statusCode = httpStatusCode?.SERVER_ERROR, message = "Something went wrong", error } = errorObj
        super(message)

        this.status = "error"
        this.statusCode = statusCode
        this.error = error

        console.log(message)

        if (Error?.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor)
        }
    }

}

module.exports = ApiError