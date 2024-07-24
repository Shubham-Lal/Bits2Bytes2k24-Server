// Requiring all the packages
const express = require('express')
const router = express.Router()

// Below is a typical Router configuration

// Here we are importing API methods from controller(s)
/*
const {
  createUser,
  fetchAadhaar,
  createEmployee,
} = require('../controller/participants.js')
*/

/* Below section is not compulsory 
it is written before every "router.post(.....)" for readability and understanding
// Defining the routes
/**
 * @route POST api/admin/create
 * @description register user
 * @access public
 **/

/* Below are example HTTPS request types and respective API methods
router.post('/createuser', createUser)
router.get('/createuser', createUser)
router.update('/createuser', createUser)
*/

export { router as participantsRoutes }