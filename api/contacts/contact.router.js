const router = require('express').Router()

const {
  handleContactList,
  deleteContact,
  updateContact,
  updatedStatus,
  addContactForUser,
} = require('./contact.controller')

router.post('/contact-list', handleContactList)
router.post('/add-contact', addContactForUser)
router.delete('/', deleteContact)
router.post('/update-contact', updateContact)
//  notifier
router.post('/notifier', updatedStatus)
module.exports = router
