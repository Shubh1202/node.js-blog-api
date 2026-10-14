const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true,
        default: "Guest"
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trime: true
    },
    phone: {
        type: String
    },
    password: {
        type: String,
        default: null,
        select: false
    },
    otp: {
        type: Number,
        required: true,
        minLength: 6,
        maxLength: 6,
        select: false
    },
    otpExpireTime: {
        type: Date,
        default: Date.now,
        required: true,
        select: false
    },
    isOtpVerified: {
        type: Boolean,
        enum: [true, false],
        default: false,
        select: false
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    }
},
    {
        timestamps: true
    }
)

const UserModel = mongoose.model('users', usersSchema, "users")
module.exports = UserModel;