const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    qualifications: {
        type: String,
        required: false
    },
    experience: {
        type: String,
        required: false
    },
    calId: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: false
    },
    profileImg: {
        type: String, // URL to the profile image stored on Cloudinary
        required: false
    },
    documents: {
        type: String // Array of URLs to documents stored on Cloudinary
    }
}, { timestamps: true })

module.exports = mongoose.model("doctor", doctorSchema)