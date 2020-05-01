const User = require('../models/User');

const userCtrl = {};
const passport = require('passport');

userCtrl.renderSignUpForm = (req, res) => {
	res.render('users/signup');
};

userCtrl.signup = async (req, res) => {
	const errors = [];
	const { name, email, password, confirm_password } = req.body;

	if (password !== confirm_password) {
		errors.push({ text: 'Password do not match' });
	}

	if (password.length < 4) {
		errors.push({ text: 'Passwords must be at least 4 characteres' });
	}

	if (errors.length > 0) {
		res.render('users/signup', {
			errors,
			email,
			name
		});
	} else {
		const emailUser = await User.findOne({ email: email });

		if (emailUser) {
			res.render('users/signup', { errores: 'Usuario ya esta en uso' });
		} else {
			const newUser = new User({ name, email, password });
			newUser.password = await newUser.encryptPassword(password);
			await newUser.save();
			req.flash('success_msg', 'Estas registrado');
			res.redirect('signin');
		}
	}
};

userCtrl.renderSignInForm = (req, res) => {
	res.render('users/signin');
};

userCtrl.signin = passport.authenticate('local', {
	failureRedirect: '/users/signin',
	successRedirect: '/notes',
	failureFlash: true
});

userCtrl.logout = async (req, res) => {
	req.logout();
	req.flash('success_msg', 'Sesión finalizada');
	res.redirect('/users/signin');
};

module.exports = userCtrl;
