const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'deactive'],
        default: 'active'

    },
}, {
    timestamps: true
});

const blogModel = mongoose.model("blogs", blogSchema, "blogs")
module.exports = blogModel