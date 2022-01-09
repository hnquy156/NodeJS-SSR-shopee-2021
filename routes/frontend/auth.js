const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { body, validationResult } = require('express-validator');

const collectionName = 'auth';
const ArticlesModel = require(__path_models + 'articles');
const UsersModel = require(__path_models + 'users');
const CategoriesModel = require(__path_models + 'categories');
const systemConfigs = require(__path_configs + 'system');
const MainValidator = require(__path_validates + 'login');
const NotifyConfigs = require(__path_configs + 'notify');
const salt = systemConfigs.salt;

const folderView = `${__path_views_frontend}pages/${collectionName}`;
const pageTitle = 'Login';
const linkIndex = `/`;
const linkLogin = `/auth/login/`;
const layout = __path_views_frontend + 'layouts/layout';

/* GET No permission page */
router.get('/no-permission', (req, res, next) => {
	res.render(`${folderView}/no-permission`, {
		pageTitle: 'No Permission',
		layout,
	});
});

/* GET Logout. */
router.get('/logout', async (req, res, next) => {
	req.logOut();
	res.redirect(linkLogin);
});

/* GET Login. */
router.get('/login', async (req, res, next) => {
	if (req.isAuthenticated()) res.redirect(linkIndex);
	const item = {email: '', password: ''};
	const errors = [];

	res.render(`${folderView}/login`, { 
		pageTitle, 
		layout: false,
		item,
		errors,
	});
});

// POST Login
router.post('/login', MainValidator.formValidate(body), (req, res, next) => {
	const item = req.body;
	const errors = validationResult(req).array();

	if (errors.length > 0) {
		return res.render(`${folderView}/login`, { 
			pageTitle, 
			layout: false,
			item,
			errors,
		});
	} else
	passport.authenticate('local', { 
		successRedirect: linkIndex,
        failureRedirect: linkLogin,
        failureFlash: true 
	})(req, res, next);
});

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


module.exports = router;