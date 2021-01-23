const {
    createContact,
    getContactByVeroKey
    
  } = require("./contact.service");
  module.exports = {
    createContact: (req, res) => {
        const body = req.body;
        getContactByVeroKey(body.veroKey, (err, results) => {
          if (err) {
            console.log(err);
          }
         else if (!results) {
            // Create user if don't exist in db
            console.log(body)
            var date = new Date();
            const userDate = date.getFullYear() + '-' + date.getMonth()+1 + '-' + date.getDate() + ' ' + date.getHours() + ':'+  date.getMinutes() + ':'+ date.getSeconds()  
            body.createdAt = userDate
            body.updatedAt = userDate
            body.contact = {
              verokey:"",
              name:"",
              profileImage:"",
              status:{
                  blocked:false,
                  Relation:"brother",
                  contactStatus:true
              }}
           
            console.log(body)
            createContact(body, (err, results) => {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  success: 0,
                  message: "Database connection errror"
                });
              }
              return res.status(200).json({
                success: true,
                message: "Contact List Created"
              });
            });
    
          }
          
           else {
            return res.status(200).json({
              success: 1,
              message: "Contact List "
            });
          }
        }
    
        )
        
        
    }

  }