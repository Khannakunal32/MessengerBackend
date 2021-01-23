const router = require("express").Router();

const {
    createContact
  } = require("./contact.controller");

 router.post("/contact-list", createContact);

 module.exports = router;