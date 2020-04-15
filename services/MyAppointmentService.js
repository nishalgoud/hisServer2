const Connection = require("../database/Connection");
class MyAppointmentService {
  
  async getAppointmentList(loginData) {
    try {
      let getConn = await Connection.get().getConnection();

      let res = await getConn.query(`exec get_appointment_list ${loginData.loginuserid}`);
      if (res.recordsets[0][0].code) {
        return {
          code: res.recordsets[0][0].code,
          appointmentlist: res.recordsets[1]
        };
      }
      return res.recordsets[0][0];
    } catch (error) {
      console.log(error);
    }
  }
}

//Enable singeton behaviour on this class
MyAppointmentService.__instance = null;
MyAppointmentService.get = () => {
  if (!MyAppointmentService.__instance) {
    MyAppointmentService.__instance = new MyAppointmentService();
  }
  return MyAppointmentService.__instance;
};
module.exports = MyAppointmentService;
