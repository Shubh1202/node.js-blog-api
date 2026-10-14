const ApiError = require("../utils/ApiError")
const nodemailer = require("nodemailer")

let configOptions = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_PORT === '465', // true only for port 465
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
}

const transporter = nodemailer.createTransport(configOptions)

const testConnection = (async () => {
    try {
        await transporter.verify()
        console.log(`Transport email successfully verify`)
    } catch (error) {
        console.log(`Transport email verification failed due to: ${error?.message}`)
    }
})

const sendEmail = (async (obj = {}) => {
    try {
        if (Object.keys(obj)?.length === 0) {
            throw `Email object is required to sending email.`
        }
        const mailObj = {
            from: process.env.SMTP_FROM,
            to: obj?.to,
            subject: obj?.subject,
        }

        if (obj?.text) {
            mailObj.text = obj?.text
        }

        if (obj?.html) {
            mailObj.html = obj.html
        }

        const mailInfo = await transporter.sendMail(mailObj)

    } catch (error) {
        console.log(`Email sending failed: ${error}`)
    }
})

module.exports = {
    testConnection,
    sendEmail
}