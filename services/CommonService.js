const Connection = require("../database/Connection");
class CommonService {
  async getRoles() {
    try {
      let getConn = await Connection.get().getConnection();
      let res = await getConn.query("exec get_roles");
      if (res.recordsets[0][0].code) {
        return {
          code: res.recordsets[0][0].code,
          roles: res.recordsets[1],
        };
      }
      return res.recordsets[0][0];
    } catch (error) {
      console.log(error);
    }
  }
}

//Enable singeton behaviour on this class
CommonService.__instance = null;
CommonService.get = () => {
  if (!CommonService.__instance) {
    CommonService.__instance = new CommonService();
  }
  return CommonService.__instance;
};
module.exports = CommonService;
