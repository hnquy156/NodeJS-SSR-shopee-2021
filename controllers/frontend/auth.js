const { body, validationResult } = require('express-validator');

const collectionName = 'auth';
const UsersModel = require(__path_models + 'users');
const NotifyConfigs = require(__path_configs + 'notify');
const passport = require(__path_configs + 'passport');

const folderView = `${__path_views_frontend}pages/${collectionName}`;
let   pageTitle = 'Đăng nhập';
const linkIndex = `/`;
const linkLogin = `/auth/login/`;
const layout = __path_views_frontend + 'layouts/layout';

module.exports = {
	noPermission: (req, res, next) => {
		res.render(`${folderView}/no-permission`, {
			pageTitle: 'Không được phép truy cập',
			layout,
		});
	},
	logout: async (req, res, next) => {
		req.logOut();
		res.redirect(linkLogin);
	},
	getRegister: async (req, res, next) => {
		if (req.isAuthenticated()) res.redirect(linkIndex);
		const item = {email: '', password: ''};
		const errors = [];
		pageTitle = 'Đăng kí';
		res.render(`${folderView}/register`, { 
			pageTitle, 
			layout,
			item,
			errors,
		});
	},
	postRegister: async (req, res) => {
		const item = req.body;
		const userItem = await UsersModel.getUserByUsername(item.username );
		const errors = validationResult(req).array();
		pageTitle = 'Đăng kí';
	
		if (userItem) errors.push({param: 'username', msg: NotifyConfigs.ERROR_USERNAME_EXIST});
		
		if (errors.length > 0) {
			res.render(`${folderView}/register`, {pageTitle, layout, errors, item});
		} else {
			await UsersModel.saveItemFrontend(item, {task: 'add'});
			res.redirect(linkLogin);
		}
	},
	getLogin: async (req, res, next) => {
		if (req.isAuthenticated()) res.redirect(linkIndex);
		const item = {email: '', password: ''};
		const errors = [];
	
		res.render(`${folderView}/login`, { 
			pageTitle, 
			layout,
			item,
			errors,
		});
	},
	postLogin: (req, res, next) => {
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
	}
}