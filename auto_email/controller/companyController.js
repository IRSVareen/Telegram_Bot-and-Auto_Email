const Company = require('../models/companyModel')

const getCompanies = async(req,res)=>{
    try{
        const companies = await Company.find()

        if(companies.length === 0) return res.status(404).json({msg:'No Companies found'})

        res.status(200).json(companies)
    }catch(err){
        res.status(500).json({msg:'Server Error',err})
    }
}

const addCompanies = async(req,res) =>{
    try{
        const {companyName,email} = req.body

        const company = await Company.findOne({companyName})
        if(company) return res.status(400).json({msg:'Company Already Exists'})

        await Company.create({companyName, email})
        res.status(201).json({msg:'Company Registered Successfully', companyName, email})
    }catch(err){
        res.status(500).json({msg:'Server Error',err})
    }
}

module.exports = {getCompanies, addCompanies}