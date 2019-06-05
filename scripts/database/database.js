const {
  writeFile,
  readFile
} = require('fs');
const {
  promisify
} = require('util');
const [writeFileAsync, readFileAsync] = [
  promisify(writeFile),
  promisify(readFile),
];

const uuidv1 = require('uuid/v1')

class Database {
  constructor() {
    this.FILENAME = './resorces/externals/db/products.json'
  }

  async readObjectFile() {
    const objectFile = await readFileAsync(this.FILENAME)
    return JSON.parse(objectFile.toString())
  }

  async writeObject(value) {
    await writeFileAsync(this.FILENAME, JSON.stringify(value))
    return true
  }

  async insert(product) {
    const data = await this.readObjectFile()
    const sku = uuidv1()
    const newProduct = {
      sku,
      ...product
    }

    return await this.writeObject([...data, newProduct])
  }

  async list(sku) {
    const data = await this.readObjectFile();
    return data.filter(item => (sku ? item.sku === sku : true))
  }

  async update(sku, values) {
    const data = await this.readObjectFile()
    const indice = data.findIndex(item => item.sku === sku)
    if (indice === -1) {
      throw Error('Product not found!')
    }

    const atual = data[indice]
    data.splice(indice, 1)

    const updateObject = JSON.parse(JSON.stringify(values))
    const updateData = Object.assign({}, atual, updateObject)

    return await this.writeObject([...data, updateData])
  }

  async remove(sku) {
    if (!sku) {
      await this.writeObject([])
      return true
    }

    const data = await this.readObjectFile()

    const indice = data.findIndex(item => item.sku === sku)
    if (indice === -1) {
      throw Error('Product not found!')
    }
    const atual = data[indice]
    data.splice(indice, 1)
    await this.writeObject(data)
    return true
  }
}

module.exports = new Database()
