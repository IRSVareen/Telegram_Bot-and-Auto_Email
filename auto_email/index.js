const express = require('express')
const emailController = require('./controller/emailController')
const db = require('./config/db')
const router = require('./routes/companyRoutes')

const app = express()
app.use(express.json())

app.use('/api/companies',router)

db.dbConnection()
emailController.sendDaily()

app.listen(3000,()=>{
    console.log('running on PORT 3000');
})

