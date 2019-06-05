
'use strict'

const http = require('http')
const https = require('https')
const config = require('./config')
const application = require('./app')

let server

module.exports.init = (done) => {
    console.log('init')
    let app = application.init()
    if (done) done(app, config)
}

module.exports.start = () => {
 let self = this

 console.log('Starting server')

 self.init((app, config) => {
    server = config.protocol === 'http'
     ? http.createServer(app)
     : https.createServer(config.ssl, app)

   server.listen(config.port, config.host)
   server.on('error', onServerError)
   server.on('listening', onServerListening)
 })
}

function onServerError (error) {
 let bind = typeof config.port === 'string'
   ? 'Pipe ' + config.port
   : 'Port ' + config.port

 // Handle specific listen errors with friendly messages
 switch (error.code) {
   case 'EACCES':
     console.log(error, '%s requires elevated privileges', bind)
     return process.exit(1)
   case 'EADDRINUSE':
     console.log(error, '%s is already in use', bind)
     return process.exit(1)
   default:
     console.log(error, 'Unexpected server error')
     return process.exit(1)
 }
}

function onServerListening () {
 let addr = server.address()
 let bind = typeof addr === 'string'
   ? 'pipe ' + addr
   : `${config.protocol}://${config.host}:${addr.port}`

 console.log( `Listening on ${bind}`)
}

function gracefulShutdown (callback) {
 if (!server || !server.close) {
   return callback && callback instanceof Function
     ? callback()
     : process.exit(0)
 }
 console.log('Server shutting down')
 // Give it only 5 seconds to gracefully shut down
 setTimeout(() => {
   console.log('Something did not shut down after 5s')
   process.exit(1)
 }, 5000)
 // Convert callbacks to promises
 server.close = promisify(server.close, server)
 redisClient.quit = promisify(redisClient.quit, redisClient)
 try {
   Promise.all([
     server.close,
     redisClient.quit
   ]).then(() => {
     console.log('Server gracefully shut down')
     return callback && callback instanceof Function
       ? callback()
       : process.exit(0)
   }).catch((err) => {
     console.log(err, 'Server shut down error')
     process.exit(1)
   })
 } catch (err) {
   console.log(err, 'Server shut down error')
   process.exit(1)
 }
}

if (!module.parent) {
 this.start()
}
