const passport = require('passport');
const locaStrategy = require('passport-local');

const User = require('../models/User');

passport.use(
	new locaStrategy(
		{
			usernameField: 'email',
			passwordFiel: 'password'
		},
		async (email, password, done) => {
			// Match Email's user
			const user = await User.findOne({ email });
			if (!user) {
				return done(null, false, { message: 'No se ha encontrado un usuario' });
			} else {
				//Match passeord user
				const match = await user.matchPassword(password);
				if (match) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'incorrect password' });
				}
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (erro, user) => {
		done(erro, user);
	});
});
