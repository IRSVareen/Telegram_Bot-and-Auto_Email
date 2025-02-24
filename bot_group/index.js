require('dotenv').config()
const TelegramBOT = require('node-telegram-bot-api')
// const data_pdf = require('./data_pdf')
const pdfController = require('./controller/pdfController')
// require('./db/db')

const token = process.env.BOT_API_TOKEN
// console.log(token)
const bot = new TelegramBOT(token, {polling: true})

bot.on('message',async(msg)=>{
    const chatId = msg.chat.id;
    const messageText = msg.text
    
    pdfController.sendPDFonMessage(bot, chatId, messageText)
    console.log(chatId);
    pdfController.chatIds.add(chatId)
})




pdfController.sendPDFDaily(bot);