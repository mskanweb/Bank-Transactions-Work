const express = require('express');
const { userRegisterController } = require('../controllers/auth.controllers');
const router = express.Router();

router.post('/register', userRegisterController);

module.exports = router;
