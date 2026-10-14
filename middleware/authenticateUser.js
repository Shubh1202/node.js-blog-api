const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError")
const UserModel = require("../models/users")
const { httpStatusCode } = require("../helper/httpStatusCode")

const verifyUser = (async (req, res, next) => {
    try {
        const token = req?.headers?.authorization;
        if (!token) {
            throw { code: httpStatusCode?.UNAUTHORIZED, message: "Token is required to access this resource" }
        }
        const jwtToken = token?.split(" ")[1]

        if (!jwtToken) {
            throw { code: httpStatusCode?.UNAUTHORIZED, message: "Bearer Token is required to access this resource" }
        }

        const jwtVerification = jwt.verify(jwtToken, process?.env?.JWT_SECREAT)

        const userId = jwtVerification?.id

        if (!userId) {
            throw { code: httpStatusCode?.UNAUTHORIZED, message: "Please provide valid bearer token." }
        }

        const dbResponse = await UserModel.findById(userId)
        if (!dbResponse) {
            throw { code: httpStatusCode?.UNAUTHORIZED, message: "Please provide valid bearer token." }
        }

        req.headers.user = {
            userId,
            dbResponse
        }
        next()
    } catch (error) {
        const errObj = {
            statusCode: error?.code || httpStatusCode?.UNAUTHORIZED,
            message: error?.message,
            error
        }
        next(new ApiError(errObj))
    }
})


module.exports = {
    verifyUser
}