'use strict'
const fastify = require('fastify')({
    logger: true
  })
require('dotenv').config()
const path = require('path')
const AutoLoad = require('fastify-autoload')
fastify.register(require('fastify-cors'), { 
  // put your options here
  origin:['http://localhost:3000']
})
 
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes')
  })
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'hooks')
  })
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins')
  })
// const start = async () => {
//   try {
//    let address= await fastify.listen(process.env.SERVER_PORT)
//    fastify.log.info(`server listening on ${address}`)
//   } catch (err) {
//     fastify.log.error(err)
//     process.exit(1)
//   }
// }

fastify.listen(process.env.SERVER_PORT, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
  })
// start()
 


