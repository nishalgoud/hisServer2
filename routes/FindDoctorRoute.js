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
  fastify.get("/getCityStates", async function (request, reply) {
    try {
       let res = await FindDoctorService.get().getCityStates()
      return res
    } catch (error) {
      console.log(error.message);
    }
  });
  fastify.post("/bookAppointment", async function (request, reply) {
    try {
       let res = await FindDoctorService.get().bookAppointment(request.body)
      return res
    } catch (error) {
      console.log(error.message);
    }
  });
  
}