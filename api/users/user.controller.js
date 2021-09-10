const {
  create,
  getUserByUserEmail,
  getUserByUserId,
	  getUserByUserIdNew,
  getUsers,
  updateUser,
  deleteUser,
  getMyChatData,
	storeMyNtoken,
	getNotification,
	getSeenStatus,
	purgeChats,
	getLastChatForMe,
	deleteChats,
	showUserEmailById,
	storePurchasedOrder,
	showPurchasedOrder
} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
     else if (!results) {
        // Create user if don't exist in db
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        const randomIdGen = () =>{
          return Math.floor((Math.random() * 100) + 54)
        }
        const random = `${randomIdGen()}${randomIdGen()}${randomIdGen()}${randomIdGen()}${randomIdGen()}`
        const randomId = `${randomIdGen()}${randomIdGen()}${randomIdGen()}`
        body.privateKey = random
        body.id = randomId
        var date = new Date();
        const userDate = date.getFullYear() + '-' + date.getMonth()+1 + '-' + date.getDate() + ' ' + date.getHours() + ':'+  date.getMinutes() + ':'+ date.getSeconds()  
        body.createdAt = userDate
        body.updatedAt = userDate
        body.roompin = `${Math.floor(100000 + Math.random() * 900000)}`
        console.log(body)
        create(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection errror"
            });
          }
          return res.status(200).json({
            success: 1,
            data: results
          });
        });

      }
      
       else {
        return res.status(200).json({
          success: 1,
          message: "User Already Exist! Try Loggin In"
        });
      }
    }

    )
    
    
},
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.status(200).json({
          success: false,
          message: "Invalid Username and Password"
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "1h"
        });
        return res.json({
          success: true,
          message: "login successfully",
          token: jsontoken,

        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    }
    );
  },
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
	 getUserByUserIdNew: (req, res) => {
    const id = req.body.id;
    getUserByUserIdNew(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
	
	  
  updateUsers: (req, res) => {
    const body = req.body;
    
    
    const salt = genSaltSync(10);
    // body.password = hashSync(body.password, salt);
    // updateUser(id,body, (err, results) => {
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(req.params);
      return res.json({
        
        success: 1,
        message: "updated successfully"
      });
    });
  },
	 storeMyNtoken: (req, res) => {
    const body = req.body;
    storeMyNtoken(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  },
  getMyChatData: (req, res) => {
    const body = req.body;
    getMyChatData(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: results
      });
    });
  },
	  purgeChats: (req, res) => {
    const body = req.body;
    purgeChats(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: results
      });
    });
  },
	 deleteChats: (req, res) => {
    const body = req.body;
    deleteChats(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: results
      });
    });
  },
	 showUserEmailById: (req, res) => {
    const body = req.body;
    showUserEmailById(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: results
      });
    });
  },
	
	
    getLastChatForMe: (req, res) => {
    const body = req.body;
    getLastChatForMe(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: results
      });
    });
  },
	
	  
	 getSeenStatus: (req, res) => {
    const body = req.body;
    getSeenStatus(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: results
      });
    });
  },
	 storePurchasedOrder: (req, res) => {
    const body = req.body;
    storePurchasedOrder(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: results
      });
    });
  },
	
	
	 showPurchasedOrder: (req, res) => {
    const body = req.body;
    showPurchasedOrder(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: results
      });
    });
  },
	
	 getNotification: (req, res) => {
    const body = req.body;
    getNotification(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: results[results.length-1]
      });
    });
  },
	
	  
	  
	  getUserByUserEmail: (req, res) => {
    const body= req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully"
      });
    });
  }
};
