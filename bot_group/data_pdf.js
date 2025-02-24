const {jsPDF}  = require('jspdf')
const fs = require('fs')


// Generating a PDF and sending it automatically

// const generatePDFandSend = async(bot, chatId) => {
//     try {
//         const doc = new jsPDF()
//         const fileName = `generated_${Date.now()}.pdf`

//         doc.text("This is an automatically generated pdf", 20, 30)
//         doc.text(`TimeStamp:${new Date().toLocaleString}`, 20, 50)

//         const pdfOut = doc.output()
//         fs.writeFileSync(fileName, pdfOut, "binary")
//         console.log(`PDF saved:${fileName}`);
//         await bot.sendDocument(chatId,fileName)
//         console.log('PDF sent to  telegram');

//         fs.unlinkSync(fileName)
    
//     } catch (err) {
//         console.error(err)
//     }
// }

// function startPDFGeneration(bot, chatId) {
//     let count = 0;
//     const interval_id = setInterval(() => {
//         generatePDFandSend(bot, chatId);
//         count++;

//         if (count >= 2) {
//             clearInterval(interval_id);
//             console.log("PDF generation stopped.");
//         }
//     }, 10000);
// }

// module.exports = {startPDFGeneration}


// sending already made pdf

const filePath = 'Alliance_Report_19_20_Feb.pdf'; 

const sendPDF = async(bot,chatId) =>{
    try{
        if (!fs.existsSync(filePath)) {
            throw new Error("❌ PDF file not found.");
        }
        await bot.sendDocument(chatId, fs.createReadStream(filePath)); // Await ensures proper execution
        console.log(`✅ Sent ${filePath} to Telegram.`);
    }catch(err){
        console.error("❌ Error sending PDF:", err.message)
    }
}

function startPDFGeneration(bot, chatId) {
    let count = 0;
    const interval_id = setInterval(() => {
        sendPDF(bot, chatId);
        count++;

        if (count >= 2) {
            clearInterval(interval_id);
            console.log("PDF generation stopped.");
        }
    }, 10000);
}

const sendPDFonMessage = (bot, chatId)=>{
    bot.on('message',async(msg)=>{
        try{
            const messageText = msg.text

            if(messageText === '/report'){
                if (!fs.existsSync(filePath)) {
                    throw new Error("❌ PDF file not found.");
                }
                await bot.sendDocument(chatId, fs.createReadStream(filePath)); // Await ensures proper execution
                console.log(`✅ Sent ${filePath} to ${chatId}`);
            }
        }catch(err){
            console.error("❌ Error sending PDF:", err.message)
        }
    })
    
}


module.exports = {startPDFGeneration, sendPDFonMessage}