'use strict'

const Express = require('express')
const path = require('path')
const localVariables = require('./config/local-variables')
const bodyParser = require('body-parser')
var methodOverride = require('method-override')

function initLocalVariables (app) {
 app.use(localVariables())
}

function initMiddlewares (app) {
app.use(Express.static(path.resolve('./public'), { }))
 // Request logger
app.use((req, res, next) => {
   next()
 })
}

module.exports.init = () => {
 let app = new Express()
 
 app.set('views', path.resolve('./views'))
 app.set('view engine', 'pug')
 
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: true }))
 app.use(methodOverride('_method'))

 app.route('/healthz').get((req, res, next) => {
   if (req.method === 'GET') {
     return res.send('OK')
   } else if (req.method === 'HEAD') {
     return res.statusCode(200)
   }
   next()
 })

 // Middleware initialization
 initMiddlewares(app)
 // Variables initialization
 initLocalVariables(app)

 // Mount the app's defined and nested routes
 app.use(require('./routes'))



console.log('Init Web Express App - Finished')

 return app
}
