const User = require('../models/userModel')

const getUsers = async(req,res) =>{
    try{
        const users = await User.find()
        if(users.length === 0) return res.status(404).json({msg:'No Users found'})

        res.status(200).json(users)
    }catch(err){
        res.status(500).json({msg:'Server Error', err})
    }
}

const addUsers = async(req,res)=>{
    try{
        const {companyName, chatId} = req.body

        const company = await User.findOne({companyName})
        if(company) return res.status(400).json({msg:'Company Already Exists'})

        await User.create({companyName: companyName, chatId: chatId})
        res.status(201).json({msg:'Company registered Successfully', companyName, chatId})
    }catch(err){
        res.status(500).json({msg:'Server Error', err})
    }
}

module.exports = {getUsers, addUsers}