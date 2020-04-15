'use strict'
const MyAppointmentService =require('../services/MyAppointmentService')

module.exports = async function (fastify, opts) {
 
  fastify.post("/getAppointmentList", async function (request, reply) {
    try {
       let res = await MyAppointmentService.get().getAppointmentList(request.body)
      return res
    } catch (error) {
      console.log(error.message);
    }
  });
  
}