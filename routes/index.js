const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');


router.get('/', homeController.homePage);

router.get('/login', userController.loginForm);
router.get('/register', userController.registerForm);

// 1. Validate the registration data
router.post('/register', userController.validateRegister);

module.exports = router;