const ApiResponse = require("../utils/ApiResponse")
const ApiError = require("../utils/ApiError")
const { httpStatusCode } = require("../helper/httpStatusCode")
const UserModel = require("../models/users")


const createUsers = ((req, res, next) => {
    try {

    } catch (error) {

    }
})

const updateUserById = ((req, res, next) => {
    try {

    } catch (error) {

    }
})

const getUsers = (async (req, res, next) => {
    try {
        const dbResponse = await UserModel.find()

        if (!dbResponse.length) {
            throw { code: httpStatusCode.PAGE_NOT_FOUND, message: "Users not found" }
        }

        return res.status(httpStatusCode.SUCCESS).send(new ApiResponse("Users successfully fetched", dbResponse))

    } catch (error) {
        const errorObj = {
            statusCode: httpStatusCode?.SERVER_ERROR,
            error: error,
            message: error?.message
        }
        next(new ApiError(errorObj))
    }
})

const getUserById = (async (req, res, next) => {
    try {

        const id = req.params?.id;

        const dbResponse = await UserModel.findById(id)

        if (!dbResponse) {
            throw { code: httpStatusCode.PAGE_NOT_FOUND, message: "User not found" }
        }

        return res.status(httpStatusCode.SUCCESS).send(new ApiResponse("User detail successfully found", dbResponse))


    } catch (error) {
        const errorObj = {
            statusCode: httpStatusCode?.SERVER_ERROR,
            error: error,
            message: error?.message
        }
        next(new ApiError(errorObj))
    }
})



module.exports = {
    createUsers,
    updateUserById,
    getUserById,
    getUsers
}