'use strict'

const path = require('path')
const envalid = require('envalid')

const readCert = (filename) => {
 return fs.existsSync(filename)
   ? fs.readFileSync(filename, 'utf8')
   : ''
}

// Load and sanitize env variables

const env = envalid.cleanEnv(process.env, {
 NODE_ENV: envalid.str({
   devDefault: 'development',
   choices: ['development', 'test', 'production']
 }),
 LOG_LEVEL: envalid.str({
   default: 'info', choices: ['trace', 'info', 'debug', 'warn', 'error', 'fatal']
 }),
 PORT: envalid.num({
   default: 8080
 }),
 HOST: envalid.str({
   default: '127.0.0.1'
 }),
 PROTOCOL: envalid.str({
   default: 'http',
   choices: ['http', 'https']
 }),
 DOMAIN: envalid.str({
   devDefault: 'localhost',
   desc: 'DOMAIN config should be set to the fully qualified application accessible URL.'
 }),

})

// Consolidate configuration data

const config = {
 env: env.NODE_ENV,
 port: env.PORT,
 host: env.HOST,
 protocol: env.PROTOCOL,
 domain: env.DOMAIN,
 logLevel: env.LOG_LEVEL
}

module.exports = config
