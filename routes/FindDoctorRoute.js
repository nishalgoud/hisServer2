'use strict'
const FindDoctorService =require('../services/FindDoctorService')

module.exports = async function (fastify, opts) {
 
  fastify.get("/getDoctors", async function (request, reply) {
    try {
       let res = await FindDoctorService.get().getDoctors()
      return res
    } catch (error) {
      console.log(error.message);
    }
  });
}