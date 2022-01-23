const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const collectionName = 'users';
const UsersModel = require(__path_models + 'users');
const DeliveryModel = require(__path_models + 'deliveries');
const NotifyConfigs = require(__path_configs + 'notify');
const systemConfigs = require(__path_configs + 'system');
const FileHelpers = require(__path_helpers + 'file');
const Validates = require(__path_validates + collectionName);
const NotifyHelpers = require(__path_helpers + 'notify');

const folderUploads = `${__path_uploads}${collectionName}/`;
const folderView = `${__path_views_frontend}pages/${collectionName}`;
const salt = systemConfigs.salt;
let   pageTitle = 'Đăng nhập';
const linkIndex = `/users/profile`;
const linkLogin = `/auth/login/`;
const layout = __path_views_frontend + 'layouts/layout';

/* GET change password. */
router.get('/change-password', async (req, res, next) => {
	const messages	= req.flash('notify');
	const item = req.user;
	const errors = [];
	pageTitle = 'Đổi mật khẩu';

	res.render(`${folderView}/change-password`, { 
		pageTitle, 
		layout,
		item,
		errors,
		messages,
	});
});

/* POST change password. */
router.post('/change-password', Validates.passwordFrontendValidate(body), async (req, res, next) => {
	const messages	= [];
	const item = req.body;
	const errors = validationResult(req).array();
	const task = 'edit-password';
	pageTitle = 'Đổi mật khẩu';

	const userItem = await UsersModel.getItem(item.id);
	
	if (!bcrypt.compareSync(item.password_old, userItem.password)) {
		errors.push({param: 'password_old', msg: NotifyConfigs.ERROR_PASSWORD});
	}

	if (errors.length > 0) {
		return res.render(`${folderView}/change-password`, { 
			pageTitle, 
			layout,
			item,
			errors,
			messages,
		});
	}

	await UsersModel.saveItemFrontend(item, {task});
	NotifyHelpers.showNotifyAndRedirect(req, res, linkIndex, {task});
});

/* GET profile. */
router.get('/profile', async (req, res, next) => {
	// if (req.isAuthenticated()) res.redirect(linkIndex);
	const messages	= req.flash('notify');
	const item = req.user;
	const errors = [];
	pageTitle = 'Thông tin người dùng';

	const cities = await DeliveryModel.getListFrontend({task: 'list'});

	res.render(`${folderView}/index`, { 
		pageTitle, 
		layout,
		item,
		errors,
		cities,
		messages,
	});
});

// POST profile //
router.post('/profile', FileHelpers.upload('avatar', 'users'), Validates.formFrontendValidate(body), async (req, res) => {
	const item = req.body;
	const messages = [];
	const errors = validationResult(req).array();
	const cities = await DeliveryModel.getListFrontend({task: 'list'});
	const task = 'edit-info';

	if (req.errorMulter) {
		if (req.errorMulter.code && req.errorMulter.code === 'LIMIT_FILE_SIZE')
			errors.push({param: 'avatar', msg: NotifyConfigs.ERROR_FILE_LIMIT});
		else
			errors.push({param: 'avatar', msg: req.errorMulter});
	}

	if (errors.length > 0) {
		if (req.file) FileHelpers.removeFile(folderUploads, req.file.filename);
		item.avatar = item.avatar_old;
		res.render(`${folderView}/index`, {pageTitle, layout, errors, item, cities, messages});

	} else {
		if (!req.file && task === 'edit-info') {
			item.avatar = item.avatar_old
		} else {
			item.avatar = req.file.filename;
			FileHelpers.removeFile(folderUploads, item.avatar_old);
		}
		await UsersModel.saveItemFrontend(item, {task});
		NotifyHelpers.showNotifyAndRedirect(req, res, linkIndex, {task});
	}
});



module.exports = router;