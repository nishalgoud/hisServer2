const sql = require("mssql");

class Connection {
  async getConnection() {
    try {
      let config = {
        user: process.env.SQL_USERNAME,
        password: process.env.SQL_PASSWORD,
        server: process.env.SQL_DATABASE_SERVER_NAME,
        database: process.env.SQL_DATABASE,
      };
      let pool = await new sql.ConnectionPool(config);
      let connect = await pool.connect();
      let request = await connect.request();

      return request;
    } catch (error) {
      console.log(error);
    }
  }
}

//Enable singeton behaviour on this class
Connection.__instance = null;
Connection.get = () => {
  if (!Connection.__instance) {
    Connection.__instance = new Connection();
  }
  return Connection.__instance;
};
module.exports = Connection;
