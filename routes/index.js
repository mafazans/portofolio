const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const blogController = require('../controllers/blogController');
const { catchErrors } = require('../handlers/errorHandlers');


router.get('/', homeController.homePage);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);

router.get('/auth/facebook', authController.fbLogin);

router.get('/auth/facebook/callback', authController.fbLoginCallback);

// 1. Validate the registration data
router.post('/register',
	userController.validateRegister,
	userController.register,
	authController.login
);

router.get('/logout', authController.logout);
router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token',
	authController.confirmedPassword,
	catchErrors(authController.update)
);


router.get('/api/search', catchErrors(blogController.searchPost));

module.exports = router;
