const {
  createContact,
  allContact,
  addContact,
  getContactByVeroKey,
  checkContactListExist,
  updatingContactList,
} = require('./contact.service')
module.exports = {
  handleContactList: (req, res) => {
    const body = req.body
    getContactByVeroKey(body, (err, results) => {
      if (err) {
        console.log(err)
      } else if (!results) {
        console.log('contact do not exist!')
        // Create user if don't exist in db we initalize empty list
        var date = new Date()
        const userDate =
          date.getFullYear() +
          '-' +
          date.getMonth() +
          1 +
          '-' +
          date.getDate() +
          ' ' +
          date.getHours() +
          ':' +
          date.getMinutes() +
          ':' +
          date.getSeconds()
        body.createdAt = userDate
        body.updatedAt = userDate
        createContact(body, (err, results) => {
          if (err) {
            console.log(err)
            return res.status(500).json({
              success: false,
              message: 'Database connection errror',
            })
          }
          return res.status(200).json({
            success: true,
            message: 'Contact List Created',
          })
        })
      } else {
        console.log('contact exist!')
        allContact(body, (err, results) => {
          if (err) {
            console.log(err)
            return res.status(500).json({
              success: false,
              message: 'Database connection errror',
            })
          }
          return res.status(200).json({
            success: true,
            message: 'Contact List ',
            data: results,
          })
        })
      }
    })
  },
  addContactForUser: (req, res) => {
    //-----------------------------------------Creating JSON Object for DB
    body = req.body
    var newContacts = new Array()
    newContacts.push({
      name: body.name,
      profileImage: body.profileImage,
      veroKey: body.contactveroKey,
      status: {
        blocked: false,
        relation: body.relation,
        contactStatus: true,
      },
    })
    //----------------------------------------Check If Contact List Exist
    checkContactListExist(body, (err, results) => {
      if (err) {
        console.log(err)
      } else if (results.contact == null) {
        //-------------------------------------Add first contact !
        const veroKey = body.veroKey
        console.log('contact do not exist in contact List!', results)
        var stringifiedContacts = JSON.stringify(newContacts)
        addContact(stringifiedContacts, veroKey, (err, results) => {
          console.log('from addContact()', results)
          if (err) {
            console.log(err)
            return res.status(500).json({
              success: false,
              message: 'Database connection errror',
              data: results,
            })
          }
          return res.status(200).json({
            success: true,
            message: 'Contact Added !',
          })
        })
      } else {
        //----------------------------------------If contact list exist
        var existingContactList = JSON.parse(results.contact)
        var updatedexistingContactList = JSON.stringify(
          existingContactList.concat(newContacts)
        )

        //----------------------------------------updating contact list with added contact
        const veroKey = req.body.veroKey
        addContact(updatedexistingContactList, veroKey, (err, results) => {
          if (err) {
            console.log(err)
            return res.status(500).json({
              success: false,
              message: 'Database connection errror',
            })
          }
          return res.status(200).json({
            success: true,
            message: 'Contact Added to List !',
          })
        })
      }
    })
  },
  deleteContact: (req, res) => {
    const body = req.body
    console.log('Delete contact controller', body)
    checkContactListExist(body, (err, results) => {
      if (err) {
        console.log(err)
      } else if (results.contact == null) {
        // Add first contact !
        const veroKey = body.userveroKey
        console.log('contact do not exist in contact List!', results)
        return res.status(200).json({
          success: false,
          message: 'Contact List is Empty Try adding Contact!',
        })
      } else {
        console.log('Contact exist ready to Delete!')
        // if contact list exist
        // Fetching existing list of contact
        // console.log('contact list exist adding more values!', results)
        var existingContactList = JSON.parse(results.contact)
        // ----------------------------------------------------------- Deleting contact
        console.log('data list', existingContactList)
        //--------------------------------Logic to remove contact from the object array
        var removeByAttr = function (arr, attr, value) {
          var i = arr.length
          while (i--) {
            if (
              arr[i] &&
              arr[i].hasOwnProperty(attr) &&
              arguments.length > 2 &&
              arr[i][attr] === value
            ) {
              arr.splice(i, 1)
            }
          }
          return arr
        }

        //--------------------------------------------------hit delete
        console.log('Existing Contact', existingContactList)
        const updatedexistingContactList = removeByAttr(
          existingContactList,
          'veroKey',
          body.contactveroKey
        )

        // ------------------------------------------------- Updating DB
        const userVeroKey = body.veroKey
        if (updatedexistingContactList.length == 0) {
          addContact(null, userVeroKey, (err, results) => {
            if (err) {
              console.log(err)
              return res.status(500).json({
                success: false,
                message: 'Database connection errror',
              })
            }
            return res.status(200).json({
              success: true,
              message: 'Contact Deleted!',
            })
          })
        } else {
          addContact(
            JSON.stringify(updatedexistingContactList),
            userVeroKey,
            (err, results) => {
              if (err) {
                console.log(err)
                return res.status(500).json({
                  success: false,
                  message: 'Database connection errror',
                })
              }
              return res.status(200).json({
                success: true,
                message: 'Contact Deleted!',
              })
            }
          )
        }
      }
    })
  },
  updateContact: (req, res) => {
    const body = req.body
    // console.log('Updating Controller', body)
    checkContactListExist(body, (err, results) => {
      if (err) {
        console.log(err)
      } else if (results.contact == null) {
        // Add first contact !
        const veroKey = body.userveroKey
        console.log('contact do not exist in contact List!', results)
        return res.status(200).json({
          success: false,
          message: 'Contact List is Empty Try adding Contact!',
        })
      } else {
        console.log('Contact exist ready to Update!')
        // if contact list exist
        // Fetching existing list of contact
        // console.log('contact list exist adding more values!', results)
        var existingContactList = JSON.parse(results.contact)
        // ----------------------------------------------------------- Updating contact
        // console.log('data list', existingContactList)
        //--------------------------------Logic to updating contact from the object array
        function updateUser(veroKey, body) {
          for (var i in existingContactList) {
            if (existingContactList[i].veroKey == veroKey) {
              existingContactList[i].name = body.name
              existingContactList[i].status.blocked = body.blocked
              existingContactList[i].veroKey = body.contactveroKey
              console.log('from loop', existingContactList[i].name, veroKey)
              break
              //---------------------------------Stop this loop, we found it!
            } else {
              console.log('nothing matched')
              return res.status(200).json({
                success: true,
                message: "Contact doesn't Exist",
              })
            }
          }
        }
        //--------------------------------------------------hit update
        updateUser(req.body.contactveroKey, req.body)
        console.log('Result', existingContactList)
        // ------------------------------------------------- Updating DB
        const userVeroKey = req.body.veroKey
        addContact(
          JSON.stringify(existingContactList),
          userVeroKey,
          (err, results) => {
            if (err) {
              console.log(err)
              return res.status(500).json({
                success: false,
                message: 'Database connection errror',
              })
            }
            return res.status(200).json({
              success: true,
              message: 'Contact Deleted!',
            })
          }
        )
      }
    })

    return res.status(200).json({
      success: true,
      message: 'Updated Contact',
    })
  },
  //node mailer for updating other users on status change
  updatedStatus: (req, res) => {
    const body = req.body
    console.log('Sending mail to other user controller ', body)
    return res.status(200).json({
      success: true,
      message: 'Status Updated',
    })
  },
}
