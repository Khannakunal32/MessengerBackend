const pool = require('../../config/database')
module.exports = {
  createContact: (data, callBack) => {
    console.log('create data', data.veroKey)
    pool.query(
      `insert into contacts (veroKey, name, contact, createdAt, updatedAt) values(?,?,?,?,?)`,
      [data.veroKey, data.name, null, data.createdAt, data.updatedAt],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results)
      }
    )
  },
  getContactByVeroKey: (data, callBack) => {
    pool.query(
      `select * from contacts where veroKey = ?`,
      [data.veroKey],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results[0])
      }
    )
  },
  checkContactListExist: (data, callBack) => {
    pool.query(
      `select contact from contacts where veroKey = ?`,
      [data.veroKey],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results[0], fields)
      }
    )
  },
  addContact: (data, veroKey, callBack) => {
    console.log('updating contact', data, veroKey)
    pool.query(
      `update contacts set contact =? where veroKey=?`,
      [data, veroKey],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results[0], fields)
      }
    )
  },
  allContact: (data, callBack) => {
    pool.query(
      `select * from contacts where veroKey = ?`,
      [data.veroKey],
      (error, results, fields) => {
        if (error) {
          callBack(error)
        }
        return callBack(null, results[0], fields)
      }
    )
  },
}
