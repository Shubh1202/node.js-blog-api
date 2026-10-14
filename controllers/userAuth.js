const ApiResponse = require("../utils/ApiResponse")
const ApiError = require("../utils/ApiError")
const { httpStatusCode } = require("../helper/httpStatusCode")
const UserModel = require("../models/users")
const emailService = require("../services/emailServices")
const jwt = require("jsonwebtoken")

const userRegistration = (async (req, res, next) => {
    try {
        const { email } = req.body
        const otp = Math.floor(Math.random() * 1000000);

        const obj = {
            email,
            otp
        }

        const dbResponse = await new UserModel(obj).save()
        if (dbResponse) {
            let obj = {
                name: dbResponse?.name || "Guest",
                to: email,
                subject: `User Registration`,
                html: `Hi Guest User, <p>Your Registration successfully done</p><p>Please verify your account</p><p>Your OTP code is: ${otp}</p><p>Best Regards<br/>Blog.com</p`
            }
            emailService.sendEmail(obj)
        }
        return res.status(httpStatusCode.SUCCESS).send(new ApiResponse("Registration succesfully done, please check your mail"))

    } catch (error) {
        const errorObj = {
            statusCode: error?.code || httpStatusCode.SERVER_ERROR,
            message: error?.message,
            error: error
        }
        next(new ApiError(errorObj))
    }
})

const accountVerification = (async (req, res, next) => {
    try {
        const { email, otp } = req.body
        const dbResponse = await UserModel.findOne({ email, isOtpVerified: false }).select(['_id', 'email', 'otp', 'status', 'otpExpireTime'])
        if (!dbResponse) {
            throw { code: httpStatusCode.BAD_REQUEST, message: "User not found" }
        }
        if (dbResponse?.otp != otp) {
            throw { code: httpStatusCode.BAD_REQUEST, message: "Please enter valid otp" }
        }
        if (dbResponse?.otpExpireTime > Date.now()) {
            throw { code: httpStatusCode.BAD_REQUEST, message: "Your otp has been expired" }
        }

        const updateUser = await UserModel.updateOne({
            otp: null,
            isOtpVerified: true,
            status: 'active'
        })
        if (!updateUser) {
            throw "Something went wrong"
        }

        const token = jwt.sign({
            id: dbResponse?._id,
        }, process.env.JWT_SECREAT, { expiresIn: process?.env?.JWT_EXPIRE_TIME }, { algorithm: process?.env?.JWT_ALGO })

        const data = {
            token
        }

        return res.status(httpStatusCode.SUCCESS).send(new ApiResponse("OTP successfully verified.", data))

    } catch (error) {
        const errorObj = {
            statusCode: error?.code || httpStatusCode.SERVER_ERROR,
            message: error?.message,
            error: error
        }
        next(new ApiError(errorObj))
    }
})

const userLogin = (async (req, res, next) => {
    try {
        const { email, password } = req.body
        const dbResponse = await UserModel.findOne({ email: email })

        if (!dbResponse) {
            throw { code: httpStatusCode.BAD_REQUEST, message: 'Please enter your valid email address' }
        }

        const otp = Math.floor(Math.random() * 100000)

        const name = dbResponse?.name || "Guest";
        let obj = {
            name: name,
            to: email,
            subject: `Blog OTP`,
            html: `Hi ${name},<p>Your OTP code is: ${otp}</p><p>Best Regards<br/>Blog.com</p`
        }
        emailService.sendEmail(obj)

        const updateObj = {
            otp,
            isOtpVerified: false,
            otpExpireTime: Date.now()
        }

        const dbUpdateresponse = await UserModel.findOneAndUpdate({ _id: dbResponse?._id }, updateObj)

        if (!dbUpdateresponse) {
            throw { code: httpStatusCode.BAD_REQUEST, message: 'Something went wrong.' }
        }

        return res.status(httpStatusCode.SUCCESS).send(new ApiResponse("Please check your email account."))


    } catch (error) {
        const errorObj = {
            statusCode: error.code,
            message: error?.message,
            error
        }
        next(new ApiError(errorObj))

    }
})

const updateSelfProfile = (async (req, res, next) => {
    try {
        const { name } = req?.body
        const id = req?.headers?.user?.userId

        const obj = {
            name
        }

        const dbResponse = await UserModel.findByIdAndUpdate(id, obj)

        if (!dbResponse) {
            throw { code: httpStatusCode.BAD_REQUEST, message: "Something went wrong." }
        }

        return res.status(httpStatusCode.SUCCESS).send(new ApiResponse("User profile update successfully", dbResponse))

    } catch (error) {

    }
})

const resetPassowrd = ((req, res, next) => {
    try {

    } catch (error) {

    }
})

module.exports = {
    userRegistration,
    accountVerification,
    userLogin,
    updateSelfProfile,
    resetPassowrd,

}