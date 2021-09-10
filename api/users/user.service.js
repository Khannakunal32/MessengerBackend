const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into users(firstName, lastName, email, password, username, privateKey,roompin,id,age,termsandconditions, createdAt, updatedAt) 
                values(?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        data.username,
        data.privateKey,
        data.roompin,
        data.id,
        data.age,
        data.termsandconditions,
        data.createdAt,
        data.updatedAt,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from users where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  storeMyNtoken: (data, callBack) => {
    pool.query(
      `insert into notificationToken(verokey,devicetoken) 
                values(?,?);`,
      [data.veroKey, data.token, data.veroKey],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select id,firstName,lastName,email from users where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getNotification: (data, callBack) => {
    pool.query(
      `select * from notificationToken where verokey=?`,
      [data.verokey],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByUserIdNew: (id, callBack) => {
    pool.query(
      `select * from users where privateKey = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUsers: (callBack) => {
    pool.query(
      `select id,firstName,lastName,email from users`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  // updateUser: (data, callBack) => {
  //   pool.query(
  //     `update users set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
  //     [
  //       data.first_name,
  //       data.last_name,
  //       data.gender,
  //       data.email,
  //       data.password,
  //       data.number,
  //       data.id
  //     ],
  //     (error, results, fields) => {
  //       if (error) {
  //         callBack(error);
  //       }
  //       return callBack(null, results[0]);
  //     }
  //   );
  // },
  updateUser: (data, callBack) => {
    pool.query(
      `update users set firstName=?, lastName=? where id = ?`,
      [data.first_name, data.last_name, data.id],
     
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteUser: (data, callBack) => {
    pool.query(
      `delete from registration where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  purgeChats: (data, callBack) => {
    let RoomAddress1 = data.from + data.to;
    let RoomAddress2 = data.to + data.from;
    pool.query(
      `delete from chatTable where RoomAddress=? or RoomAddress =?`,
      [RoomAddress1, RoomAddress2],
      (error, results, fields) => {
        if (error) {
          console.log(error);
        }

        return callBack(null, results);
      }
    );
  },
  deleteChats: (data, callBack) => {
    pool.query(
      `delete from chatTable where ChatId=?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          console.log(error);
        }

        return callBack(null, results);
      }
    );
  },

  getMyChatData: (data, callBack) => {
    let RoomAddress1 = data.from + data.to;
    let RoomAddress2 = data.to + data.from;
    pool.query(
      `select chat from chatTable where RoomAddress=? or RoomAddress =? ORDER BY id DESC LIMIT 1000`,
      [RoomAddress1, RoomAddress2],
      (error, results, fields) => {
        if (error) {
          console.log(error);
        }
        let ArrayofData = [];

        results.forEach((e) => ArrayofData.push(JSON.parse(e.chat)));
        console.log(ArrayofData);
        return callBack(null, ArrayofData);
      }
    );
  },
  getLastChatForMe: (data, callBack) => {
    pool.query(
      `select chat from chatTable where RoomAddress=? ORDER BY id DESC LIMIT 1`,
      [data.RoomAddress],
      (error, results, fields) => {
        if (error) {
          console.log(error);
        }
        let ArrayofData = [];

        results.forEach((e) => ArrayofData.push(JSON.parse(e.chat)));
        //console.log(ArrayofData)
        return callBack(null, ArrayofData[0]);
      }
    );
  },

  getSeenStatus: (data, callBack) => {
    pool.query(
      `select seenStatus from chatTable where ChatId=?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          console.log(error);
        }
        return callBack(null, results);
      }
    );
  },

  showUserEmailById: (data, callBack) => {
    pool.query(
      `select * from users where id=?`,
      [data.privateKey],
      (error, results, fields) => {
        if (error) {
          console.log(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  storePurchasedOrder: (data, callBack) => {
    pool.query(
      `insert into purchasedProduct(product_id, user_id,invoice_id,product,email) 
                values(?,?,?,?,?)`,
      [
        data.product_id,
        data.user_id,
        data.invoice_id,
        data.product,
        data.email,
      ],
      (error, results, fields) => {
        if (error) {
          console.log(error);
        }
        return callBack(null, results);
      }
    );
  },
  showPurchasedOrder: (data, callBack) => {
    pool.query(
      `select * from purchasedProduct where email=?`,
      [data.email],
      (error, results, fields) => {
        if (error) {
          console.log(error);
        }

        return callBack(null, results);
      }
    );
  },
};
