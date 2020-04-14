const Connection = require("../database/Connection");
class LoginService {
  async createUser(userData) {
    try {
      let getConn = await Connection.get().getConnection();
      let response = await getConn.query(
        "exec generate_random_eight_digit_number"
      );
      if (response.recordsets[0][0].code) {
        let num = response.recordsets[1][0].num;
        console.log(response.recordsets);
        console.log(num);
        console.log(userData);
        let res = await getConn.query(
          `exec create_user ${num},'${userData.firstName}','${userData.lastName}','${userData.email}','${userData.password}',${userData.roleId},${userData.ssn}`
        );
        if (res.recordsets[0][0].code) {
          return {
            code: res.recordsets[0][0].code,
            userId: num,
            msg: res.recordsets[0][0].msg,
          };
        }
        return res.recordsets[0][0];
      }
      return response.recordsets[0][0];
    } catch (error) {
      console.log(error);
    }
  }
  async login(userData) {
    try {
      let getConn = await Connection.get().getConnection();

      let res = await getConn.query(
        `exec login_user_authenticate ${userData.userId},'${userData.password}',${userData.roleId}`
      );
      if (res.recordsets[0][0].code) {

        console.log(res.recordsets)
        return {
          code: res.recordsets[0][0].code,
         userDetails:res.recordsets[1]
        };
      }
      return res.recordsets[0][0];
    } catch (error) {
      console.log(error);
    }
  }
}

//Enable singeton behaviour on this class
LoginService.__instance = null;
LoginService.get = () => {
  if (!LoginService.__instance) {
    LoginService.__instance = new LoginService();
  }
  return LoginService.__instance;
};
module.exports = LoginService;
