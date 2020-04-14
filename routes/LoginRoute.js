'use strict'
const LoginService =require('../services/LoginService')

module.exports = async function (fastify, opts) {
  fastify.post("/createUser", async function (request, reply) {
    try {
       let res = await LoginService.get().createUser(request.body)
      return res
    } catch (error) {
      console.log(error.message);
    }
  });
  fastify.post("/login", async function (request, reply) {
    try {
       let res = await LoginService.get().login(request.body)
      return res
    } catch (error) {
      console.log(error.message);
    }
  });
}