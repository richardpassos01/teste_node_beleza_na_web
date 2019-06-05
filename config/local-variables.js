const path = require('path')
const config = require('../config')

exports = module.exports = () => {
  return (req, res, next) => {
    // Proxy the render function so that the variables is
    // retrieved right before the render function is executed
    let render = res.render
    res.render = function () {
      render.apply(res, arguments)
    }
    next()
  }
}