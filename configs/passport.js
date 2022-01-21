const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const UsersModel = require(__path_models + 'users');
const systemConfigs = require(__path_configs + 'system');
const NotifyConfigs = require(__path_configs + 'notify');

passport.use(new LocalStrategy(
	async (username, password, done) => {
		const user = await UsersModel.getUserByUsername(username);

		if (!user) {
			return done(null, false, { message: NotifyConfigs.ERROR_LOGIN });
		}
		if (!bcrypt.compareSync(password, user.password)) {
			return done(null, false, { message: NotifyConfigs.ERROR_LOGIN });
		}
		console.log('Success!');
		return done(null, user);
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
	const user = await UsersModel.getItem(id);
	done(null, user);
});

module.exports = passport;