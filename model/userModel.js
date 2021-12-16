const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your first name!"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    }
})

module.exports = mongoose.model("Users", userSchema)