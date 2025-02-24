const fs = require('fs')
const path = require('path')
const schedule = require('node-schedule')



const sendPDF = async (bot, chatId, filePath) => {
    console.log(filePath)
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error("PDF file not found.");
        }
        await bot.sendDocument(chatId, fs.createReadStream(filePath));
        console.log(`Sent to Telegram.`);
    } catch (err) {
        console.error("Error sending PDF:", err.message)
    }   
}


const chatIds = new Set();


const sendPDFDaily = async (bot, chatId, filePath) => {
    console.log("Scheduled to send PDF at 5:00 AM daily...");

    schedule.scheduleJob("11 14 * * *", async () => {
        console.log("It's 5:00 AM! Sending PDF...");

        // sendPDF(bot, chatId, filePath);

        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const formatDatePart = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const prevDate = new Date(date);
            prevDate.setDate(date.getDate() - 1);
            const prevDay = String(prevDate.getDate()).padStart(2, '0');
            const month = date.toLocaleString('en-US', { month: 'short' });
            return `${prevDay}_${day}_${month}`;
        };

        // const datePart = formatDatePart(yesterday);
        const fileName = `Alliance_Report_19_20_Feb.pdf`;
        const filePath = path.join(__dirname, '../allPDF/', fileName);
        console.log(chatIds);
        chatIds.forEach(chatId=>{
            sendPDF(bot, chatId, filePath);
        })
    });
};


const sendPDFonMessage = async (bot, chatId, messageText) => {
    try {
        // const match = messageText.match(/^\/report\/(\d{2}_\d{2}_\w+)$/)
        const match = messageText.match(/^\/(\d{2}_\d{2}_\w+)$/)
        // console.log(match);

        if (!match) {

            const today = new Date();
            const yesterday = new Date();
            yesterday.setDate(today.getDate() - 1);

            const formatDatePart = (date) => {
                const day = String(date.getDate()).padStart(2, '0');
                const prevDate = new Date(date);
                prevDate.setDate(date.getDate() - 1);
                const prevDay = String(prevDate.getDate()).padStart(2, '0');
                const month = date.toLocaleString('en-US', { month: 'short' });
                // console.log(`${prevDay}_${day}_${month}`);

                return `${prevDay}_${day}_${month}`;
            };

            const exampleDatePart = formatDatePart(yesterday);
            // console.log(exampleDatePart); 
            bot.sendMessage(chatId, `Invalid Format! Use /${exampleDatePart}`);
            return;
        }

        const datePart = match[1]
        // console.log(datePart);
        const fileName = `Alliance_Report_${datePart}.pdf`
        const filePath = path.join(__dirname, '../allPDF/', fileName)

        if (!fs.existsSync(filePath)) {
            bot.sendMessage(chatId, `PDF not found: ${fileName}`);
            return;
        }

        await sendPDF(bot, chatId, filePath)
        console.log(`Sent ${filePath} to ${chatId}`);
    } catch (err) {
        console.error("Error sending PDF:", err.message)
    }

}


module.exports = { sendPDFDaily, sendPDFonMessage, chatIds }