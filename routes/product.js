'use strict'

const router = require('express').Router()
const productActions = require('./../scripts/helpers/productActions.js')

router.get('/list',
  async (req, res, next) => {
    try {
      let products = await productActions.getListProducts(null)
      return res.render('product/list', {
        products
      })
    } catch (err) {
      console.error('Don\'t Panic! ', err)
      return res.redirect('./home')
    }
  })

router.get('/add',
  async (req, res, next) => {
    return res.render('product/add')
  })

router.get('/:sku',
  async (req, res, next) => {
    try {
      let [products] = await productActions.getListProducts(req.params.sku)
      return res.render('product/details', {
        products
      })
    } catch (err) {
      console.error('Don\'t Panic! ', err)
      return res.redirect('./home')
    }
  })

router.post('/add',
  async (req, res, next) => {
    try {
      let products = await productActions.createProduct(req.body)
      return res.redirect('./list')
    } catch (err) {
      console.error('Don\'t Panic! ', err)
      return res.redirect('./home')
    }
  })

router.put('/update/:sku',
  async (req, res, next) => {
    try {
      let products = await productActions.editProduct(req.params.sku, req.body)
      return res.redirect('/product/' + req.params.sku)
    } catch (err) {
      console.error('Don\'t Panic! ', err)
      return res.redirect('./home')
    }
  })

router.delete('/remove/:sku',
  async (req, res, next) => {
    try {
      let products = await productActions.removeProduct(req.params.sku)
      return res.redirect('/product/list')
    } catch (err) {
      console.error('Don\'t Panic! ', err)
      return res.redirect('./home')
    }
  })

module.exports = router
