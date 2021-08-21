const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name required"]
    },
    email: {
        type: String,
        required: [true, "Email required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password required"]
    },

    photoUrl: {
        type: String
    },

    updatedPhotoOn: {
        type: Date
    },

    updatedAt: {
        type: Date
    },

    loggedOn: {
        type: Date
    },
})

module.exports = mongoose.model('User', UserSchema)