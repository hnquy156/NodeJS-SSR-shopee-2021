const express = require('express');
const router = express.Router();

const DeliveryModel = require(__path_models + 'deliveries');
const DiscountModel = require(__path_models + 'discounts');

const collectionName = 'checkouts';
const folderView = `${__path_views_frontend}pages/${collectionName}`;
const layout = __path_views_frontend + 'layouts/layout';
const pageTitle = 'Thanh toán';

/* GET home page. */
router.get('/:id', async (req, res, next) => {
	const id = req.params.id;
	const cities = await DeliveryModel.getListFrontend({task: 'list'});

	res.render(`${folderView}/index`, { 
		pageTitle, 
		layout, 
		cities,
	});
});

module.exports = router;