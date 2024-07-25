const express = require('express')
const router = express.Router()
const { createUser, verifyUser } = require('../controller/participants.js')

router.post("/register", createUser)
router.post("/login", verifyUser)

module.exports = router