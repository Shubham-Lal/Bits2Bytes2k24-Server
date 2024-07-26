const express = require('express')
const router = express.Router()
const { fetchCoordinators } = require('../controller/coordinators.js')

router.get("/get-all", fetchCoordinators)

module.exports = router