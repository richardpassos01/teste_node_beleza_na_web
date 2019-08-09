const assert = require('assert')
const productActions =  require('../scripts/helpers/productActions.js')
let app = {}

let MOCK_OBJ = {
    "name": "More one",
    "locality": "Itapevi",
    "quantity": "13",
    "type": "131"
}

let MOCK_TEST = {
    "sku": "",
    "name": "More one",
    "inventory": {
        "quantity": 0,
        "warehouses": [{
            "locality": "Itapevi",
            "quantity": "13",
            "type": "131"
        }]
    },
    "isMarketable": false
}

let MOCK_UPDATE_TEST = {
    "name": "update test",
    "locality": "Itapevi",
    "quantity": "10",
    "type": "132"
}     

describe('Products test', function ()  {
    this.beforeAll(async () => {
        app = await productActions
    })

    it('insert product', async () => {
        const result = await app.createProduct(MOCK_OBJ)
        MOCK_TEST.sku = result.skus
        assert.deepEqual(MOCK_TEST, result)
    })

    it('list products', async () => {
        const result = await app.getListProducts()
        assert.ok(Array.isArray(result))
    })

    it('get product', async () => {
        const [result] = await app.getListProducts(MOCK_TEST.sku)
        assert.deepEqual(MOCK_TEST, result)
    })

    it('update product{sku}', async () => {
        const result = await app.editProduct(MOCK_TEST.sku, MOCK_UPDATE_TEST)
        assert.deepEqual(result, true)

    })
    it('remove product{sku}', async () => {
        const result =  await app.removeProduct(MOCK_TEST.sku)
        assert.deepEqual(result, true)
    })
})

