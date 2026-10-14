const mongoose = require("mongoose")

const blogCommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    isDeleted: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    deleatedAt: {
        type: Date,
        default: null

    }
}, {
    timestamps: true
})

const blogCommentsModel = mongoose.model("blogComments", blogCommentSchema, "blogComments")
module.exports = blogCommentsModel