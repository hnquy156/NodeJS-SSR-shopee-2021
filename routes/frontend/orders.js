const express = require('express');
const router = express.Router();
const util = require('util');

const OrderModel = require(__path_models + 'orders');
const mailerHelpers = require(__path_helpers + 'mailer');
const notifyConfigs = require(__path_configs + 'notify');

const collectionName = 'orders';
const folderView = `${__path_views_frontend}pages/${collectionName}`;
const layout = __path_views_frontend + 'layouts/layout';
const pageTitle = 'Đơn hàng của bạn';
const linkIndex = '/' + collectionName;

/* GET ORDER PAGE */
router.get('/', async (req, res, next) => {
	
	res.render(`${folderView}/index`, { 
		layout,
		pageTitle, 
	});
});

/* GET ORDER DATA */
router.get('/:code', async (req, res, next) => {
	const { code } = req.params;

	const data = await OrderModel.getItemFrontend(code);
	res.send({data});
});

/* POST NEW ORDER */
router.post('/add', async (req, res, next) => {
	const item = JSON.parse(req.body.data);
	const user = req.user;

	const data = await OrderModel.saveItem(item, {task: 'add', user});
	
	await mailerHelpers.sendMail(user.email, notifyConfigs.MAIL_TITLE_ORDER, util.format(notifyConfigs.MAIL_CONTENT_ORDER, data.code));

	res.send(data);
});

module.exports = router;