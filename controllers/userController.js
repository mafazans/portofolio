const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.loginForm = (req, res) => {
	res.render('login', { title: 'Login', page: 'Login Page' });
};

exports.registerForm = (req, res) => {
	res.render('register', { title: 'Register', page: 'Register Page' });
};

exports.validateRegister = (req, res, next) => {
	req.sanitizeBody('name');
	req.checkBody('name', 'You must enter a name!').notEmpty();
	req.checkBody('email', 'That Email is not valid!').isEmail();
	req.sanitizeBody('email').normalizeEmail({
		gmail_remove_dots: false,
		remove_extension: false,
		gmail_remove_subaddress: false
	});
	req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
	req.checkBody('password-confirm', 'Confirm Password cannot be blank!').notEmpty();
	req.checkBody('password-confirm', 'Oops! Your password do not match').equals(req.body.password);

	const errors = req.validationErrors();
	if (errors) {
		req.flash('error', errors.map(err => err.msg));
		res.render('register', { title: 'Register', body: req.body, flashes: req.flash() });
		return;
	}
	next();
};

exports.register = async (req, res, next) => {
	const user = new User({ email: req.body.email, name: req.body.name });
	const registerWithPromise = promisify(User.register, User);
	await registerWithPromise(user, req.body.password);
	next();
};

exports.account = (req, res) => {
	res.render('account', { title: 'Edit Your Account' });
};
