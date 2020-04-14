const Connection = require("../database/Connection");
class FindDoctorService {
  async getDoctors() {
    try {
      let getConn = await Connection.get().getConnection();

      let res = await getConn.query(`exec get_doctors`);
      if (res.recordsets[0][0].code) {
        console.log(res.recordsets);
        return {
          code: res.recordsets[0][0].code,
          doctorsList: res.recordsets[1],
        };
      }
      return res.recordsets[0][0];
    } catch (error) {
      console.log(error);
    }
  }
}

//Enable singeton behaviour on this class
FindDoctorService.__instance = null;
FindDoctorService.get = () => {
  if (!FindDoctorService.__instance) {
    FindDoctorService.__instance = new FindDoctorService();
  }
  return FindDoctorService.__instance;
};
module.exports = FindDoctorService;
