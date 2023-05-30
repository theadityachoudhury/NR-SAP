const express = require('express');
const { addRoles } = require('../controllers/Auth/role-controllers');

const router = express.Router();



router.post("/add", addRoles);

module.exports = router;