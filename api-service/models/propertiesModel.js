const sql = require("mssql");
require("dotenv").config();
const sqlConfig = {
  user: "SA",
  password: process.env.SQL_SERVER_PASSWORD,
  database: "adriHouse",
  server: process.env.SQL_SERVER || "127.0.0.1",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // true for local dev / self-signed certs
  },
};

exports.propertyModel = {
  addPropertyToDatabase: async (propertyInfo) => {
    try {
      await sql.connect(sqlConfig);
      const request = new sql.Request();
      await request.query(`INSERT INTO dbo.properties 
                                  (beds, baths, postedBy,imgPath,city, address, price, postedFor)
                                   VALUES ('${propertyInfo.beds}', '${propertyInfo.baths}', 
                                   '${propertyInfo.postedBy}','${propertyInfo.imgPath}','${propertyInfo.city}',
                                    '${propertyInfo.address}', '${propertyInfo.price}', '${propertyInfo.postedFor}'
                                    );`);

      return true; // Indicates success
    } catch (error) {
      console.error("Error adding data to database:", error);
      return false; // Indicates failure
    }
  },
  getPropertyFromDatabase: async (sqlQuery) => {
    try {
      await sql.connect(sqlConfig);
      const request = new sql.Request();
      const result = await request.query(sqlQuery);
      return result;
    } catch (error) {
      console.log("Error getting data from database:", error);
      return false;
    }
  },
};
