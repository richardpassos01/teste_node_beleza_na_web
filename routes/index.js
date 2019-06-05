    
'use strict'

const router = require('express').Router()

// loads the controllers
const productRouter = require('./product')
const homeRouter = require('./home')

// protected routes
router.use('/product', productRouter)
router.use('/', homeRouter)

module.exports = router