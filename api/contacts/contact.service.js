const pool = require("../../config/database");
module.exports = {
  
  createContact: (data, callBack) => {
    pool.query(
      `insert into users(veroKey,contact,createdAt,updatedAt) 
                values(?,?,?,?)`,
      [
        data.veroKey,
        {},
        data.createdAt,
        data.updatedAt
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getContactByVeroKey: (veroKey, callBack) => {
    pool.query(
      `select * from contacts where veroKey = ?`,
      [veroKey],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0],);
      }
    );
  },
}