const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    companyName:{
        type: String,
        required: true
    },
    chatId:{
        type: String,
        required: true
    }
})

module.exports = new mongoose.model('User', userSchema)