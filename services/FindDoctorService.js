const Connection = require("../database/Connection");
class FindDoctorService {
  async getDoctors() {
    try {
      let getConn = await Connection.get().getConnection();

      let res = await getConn.query(`exec get_doctors`);
      if (res.recordsets[0][0].code) {
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
  
  async getCityStates() {
    try {
      let getConn = await Connection.get().getConnection();

      let res = await getConn.query(`exec get_city_states`);
      if (res.recordsets[0][0].code) {
        return {
          code: res.recordsets[0][0].code,
          stateslist: res.recordsets[1],
          citieslist: res.recordsets[2]
        };
      }
      return res.recordsets[0][0];
    } catch (error) {
      console.log(error);
    }
  }
  async bookAppointment(appointmentData) {
    try {
      let getConn = await Connection.get().getConnection();

      let res = await getConn.input('userId',appointmentData.userid)
      .input('loginuserid',appointmentData.loginuserid)
      .input('email',appointmentData.email)
      .input('firstName',appointmentData.firstname)
      .input('lastName',appointmentData.lastname)
      .input('phone',appointmentData.phone)
      .input('insuranceid',appointmentData.insuranceid)
      .input('ssn',appointmentData.ssn)
      .input('age',appointmentData.age)
      .input('gender',appointmentData.gender)
      .input('address',appointmentData.address)
      .input('countryid',appointmentData.countryid)
      .input('stateid',appointmentData.stateid)
      .input('cityid',appointmentData.cityid)
      .input('zipcodeid',appointmentData.zipcodeid)
      .input('symptoms',appointmentData.symptoms)
      .input('medicalhistory',appointmentData.medicalhistory)
      .input('appointmentdate',appointmentData.appointmentdate)
      .input('fromtime',appointmentData.fromtime)
      .input('totime',appointmentData.totime)
      .execute('book_appointment')
      if (res.recordsets[0][0].code) {
        return res.recordsets[0][0]
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
