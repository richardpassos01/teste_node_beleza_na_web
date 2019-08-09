'use strict'

const Database = require('./../database/database')

async function getListProducts(sku) {
  return await Database.list(sku)
}

async function createProduct(product) {
  let finalProduct = {
    name: product.name,
    inventory: {
      quantity: 0,
      warehouses: [{
        locality: product.locality,
        quantity: product.quantity,
        type: product.type
      }]
    },
    isMarketable: false
  }
  return await Database.insert(finalProduct)
}

async function editProduct(sku, product) {
  product.quantityModify = parseInt(product.quantityModify) + 1

  let editProduct = {
    name: product.name,
    inventory: {
      quantity: product.quantityModify,
      warehouses: [{
        locality: product.locality,
        quantity: product.quantity,
        type: product.type
      }]
    },
    isMarketable: true
  }
  return await Database.update(sku, editProduct)
}

async function removeProduct(sku) {
  return await Database.remove(sku)
}

module.exports = {
  getListProducts,
  createProduct,
  editProduct,
  removeProduct
}
