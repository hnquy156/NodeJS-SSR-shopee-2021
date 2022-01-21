const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');

const collectionName = 'auth';
const UsersModel = require(__path_models + 'users');
const CategoriesModel = require(__path_models + 'categories');
const NotifyConfigs = require(__path_configs + 'notify');
const systemConfigs = require(__path_configs + 'system');
const LoginValidator = require(__path_validates + 'login');
const RegisterValidator = require(__path_validates + 'register');
const passport = require(__path_configs + 'passport');
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

/* GET Register. */
router.get('/register', async (req, res, next) => {
	if (req.isAuthenticated()) res.redirect(linkIndex);
	const item = {email: '', password: ''};
	const errors = [];

	res.render(`${folderView}/register`, { 
		pageTitle, 
		layout,
		item,
		errors,
	});
});

// POST REGISTER
router.post('/register', RegisterValidator.formValidate(body), async (req, res) => {
	const item = req.body;
	const userItem = await UsersModel.getUserByUsername(item.username );
	const errors = validationResult(req).array();

	if (userItem) errors.push({param: 'username', msg: NotifyConfigs.ERROR_USERNAME_EXIST});
	
	if (errors.length > 0) {
		res.render(`${folderView}/register`, {pageTitle, layout, errors, item});
	} else {
		await UsersModel.saveItemFrontend(item, {task: 'add'});
		res.redirect(linkLogin);
	}
});

/* GET Login. */
router.get('/login', async (req, res, next) => {
	if (req.isAuthenticated()) res.redirect(linkIndex);
	const item = {email: '', password: ''};
	const errors = [];

	res.render(`${folderView}/login`, { 
		pageTitle, 
		layout,
		item,
		errors,
	});
});

// POST Login
router.post('/login', LoginValidator.formValidate(body), (req, res, next) => {
	const item = req.body;
	const errors = validationResult(req).array();

	if (errors.length > 0) {
		return res.render(`${folderView}/login`, { 
			pageTitle, 
			layout,
			item,
			errors,
		});
	} else return passport.authenticate('local', { 
		successRedirect: linkIndex,
        failureRedirect: linkLogin,
        failureFlash: true 
	})(req, res, next);
});



module.exports = router;