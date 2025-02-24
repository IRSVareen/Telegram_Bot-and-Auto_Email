const express = require('express')
const emailController = require('./controller/emailController')

const app = express()

emailController.sendDaily()

app.listen(5000,()=>{
    console.log('running on PORT 3000');
})

