'use strict'

const router = require('express').Router()

// default
router.get('/',
  (req, res) => {
    res.redirect('/home')
  }
)

router.get('/home',
  (req, res) => {
    res.render('home/home')
  }
)

module.exports = router
