const { httpStatusCode } = require("../helper/httpStatusCode")

const urlNotFound = ((req, res, next) => {
    const obj = {
        code: httpStatusCode?.PAGE_NOT_FOUND,
        status: "error",
        message: `Request url not found`,
        url: req.url
    }

    return res.status(httpStatusCode.PAGE_NOT_FOUND).json(obj)
})



const serverError = ((error, req, res, next) => {

    const statusCode = error?.statusCode || httpStatusCode?.SERVER_ERROR
    const status = error?.status || "error"
    const message = error?.message || "Internal server error"

    const obj = {
        status,
        message,
    }

    if (['local', 'development', 'staging', 'qa']?.includes(process.env.NODE_ENV)) {
        console.trace(error)
    }

    return res.status(statusCode).json(obj)
})

module.exports = {
    urlNotFound,
    serverError
}