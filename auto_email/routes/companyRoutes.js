const express = require('express')
const companyController = require('../controller/companyController')

const router = express.Router()

router.get('/', companyController.getCompanies)
router.post('/add', companyController.addCompanies)

module.exports = router