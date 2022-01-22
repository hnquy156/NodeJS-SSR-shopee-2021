const express = require('express');
const router = express.Router();

const systemConfigs = require(__path_configs + 'system');
const ContactModel = require(__path_schemas + 'contacts')
const DiscountModel = require(__path_schemas + 'discounts')
const OrderModel = require(__path_schemas + 'orders')

/* GET home page. */
router.get('(/dashboard)?', async (req, res, next) => {
	let managements = [...systemConfigs.dashboard_managements];
	await Promise.all(
		managements.map((management, index) => {
			const MainModel = require(__path_schemas + management.collection);
			return MainModel.countDocuments({}).then(count => {management.count = count});
		})
	);
	const contactItems = await ContactModel.find({status: 'inactive'}).sort({'created.time': 'desc'}).limit(5);
	const discountItems = await DiscountModel.find({status: 'active'}).sort({'created.time': 'desc'}).limit(5);
	const orderItems = await OrderModel.find({}).sort({'created.time': 'desc'}).limit(5).populate('city');

	res.locals.sidebarActive = `dashboard|list`;;
	res.render('backend/pages/dashboard', { 
		pageTitle: 'Dashboard',
		managements,
		contactItems,
		discountItems,
		orderItems,
	});
});

module.exports = router;
