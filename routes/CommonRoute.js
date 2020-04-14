"use strict";
const CommonService = require("../services/CommonService");

module.exports = async function (fastify, opts) {
  fastify.get("/getRoles", async function (request, reply) {
    try {
      let res = await CommonService.get().getRoles();
      return res;
    } catch (error) {
      console.log(error.message);
    }
  });
};
