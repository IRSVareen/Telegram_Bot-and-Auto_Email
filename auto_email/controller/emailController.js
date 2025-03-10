const nodemailer = require("nodemailer");
const schedule = require('node-schedule')
const path = require('path')
const fs = require('fs')
require('dotenv').config()
const jsonData = require('../data')
const Company = require('../models/companyModel')





function generateTable(jsonData) {
  let table = `<table border='1'>
                  <tr>
                      <th>Warnings/Errors</th>
                      <th>Frequency</th>
                      <th>Log Time</th>
                      <th>Value</th>
                      <th>Cause</th>
                      <th>Remedy</th>
                  </tr>`;
  
  jsonData.data.forEach(error => {
      table += `<tr>
                  <td>${error.message}</td>
                  <td>${error.count}</td>
                  <td>${error.lasttime}</td>
                  <td>${error.errorCode}</td>
                  <td>${error.causes.join('<br>')}</td>
                  <td>${error.remedies.join('<br>')}</td>
                </tr>`;
  });
  
  table += `</table>`;
  return table
}

const sendEmail_HTML = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "patelvareen23@gmail.com",
        pass: process.env.EMAIL_PASSWORD
      },
    });


    const companies = await Company.find()

    if(companies.length === 0){
      console.log('No Companies exists in the database.');
      return;
    }

    for(let company of companies){
      const {companyName, email} = company

      if(!companyName || !email){
        console.log('Missing companyName or email',company);
      }
      const tableData = generateTable(jsonData)
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <style>
          body { font-family: Arial, sans-serif; margin: 20px; background-color: #f8f9fa; }
          h2 { text-align: center; color: #333; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid black; }
          th, td { border: 1px solid black; padding: 10px; text-align: left; }
      </style>
    </head>

    <body>
      <h2>${companyName} (19/2/25 - 20/2/25)</h2>
      ${tableData}
    </body>
    </html>`



    let info = await transporter.sendMail({
      from: '"Vareen Patel" <patelvareen23@gmail.com>',
      to: email,
      subject: `Report for ${companyName}`,
      html: htmlContent
    });

    console.log("Message sent: %s", info.messageId);
    }

    
  } catch (error) {
    console.error("Error sending email:", error);
  }
};



// Sending Pdf in email

const sendEmail = async () => {
  try {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, 
      auth: {
        user: "patelvareen23@gmail.com", 
        pass: process.env.EMAIL_PASSWORD 
      },
    });


    const companies = await Company.find()

    if(companies.length === 0){
      console.log('No Companies exists in the database.');
      return;
    }

    for(let company of companies){

      const {companyName, email} = company

      const getTodayFileName = () => {
        const date = new Date();
        const today = String(date.getDate()).padStart(2, "0");
        const yesterday = String(date.getDate() - 1).padStart(2, "0");
        const month = date.toLocaleString("en-US", { month: "short" });
        console.log(`${yesterday}_${today}_${month}`)
        return `${companyName}_Report_${yesterday}_${today}_${month}.pdf`;
      };
  
      const fileName = getTodayFileName()
      const filePath = path.join(__dirname, '..','/allPDF',fileName)
  
      if(!fs.existsSync(filePath)){
        console.error(`Error: File "${fileName}" not found.`);
        return;
      }
  
      let info = await transporter.sendMail({
        from: '"Vareen Patel" <patelvareen23@gmail.com>', 
        to: email, 
        subject: `${companyName} Report`, 
        text: "This is the Auto-Generated Report ",
        attachments: [
          {
            path: filePath,
            filename: fileName,
            contentType: "application/pdf",
          },
        ],
      });

    console.log("Message sent: %s", info.messageId);
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};



const sendDaily = async () => {
  console.log('sending');
  schedule.scheduleJob("48 10 * * *", () => {
    console.log('mail scheduled at Time');
    sendEmail()
    // sendEmail_HTML()
  })
}




module.exports = { sendDaily };