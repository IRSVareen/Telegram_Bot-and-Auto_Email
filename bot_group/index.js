require('dotenv').config()
const TelegramBOT = require('node-telegram-bot-api')
// const data_pdf = require('./data_pdf')
const pdfController = require('./controller/pdfController')
const router = require('./routes/userRoutes')
require('./db/db')
const express = require('express')
const app = express()

app.use(express.json())

const token = process.env.BOT_API_TOKEN
// console.log(token)
const bot = new TelegramBOT(token, {polling: true})

bot.on('message',async(msg)=>{
    const chatId = msg.chat.id;
    const messageText = msg.text;
    const groupName = msg.chat.title;
    console.log(groupName);
    pdfController.sendPDFonMessage(bot, chatId, messageText)
    console.log(chatId);
})


app.use('/api/user',router)

pdfController.sendPDFDaily(bot);


app.listen(3000,()=>{
    console.log('Listening on port 3000');
})
