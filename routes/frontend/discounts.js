const express = require('express');
const router = express.Router();

const DeliveryModel = require(__path_models + 'deliveries');
const DiscountModel = require(__path_models + 'discounts');

const collectionName = 'discounts';
const folderView = `${__path_views_frontend}pages/${collectionName}`;
const layout = __path_views_frontend + 'layouts/layout';
const pageTitle = 'Discount';

/* GET discount code */
router.get('/:code', async (req, res, next) => {
	const code = req.params.code;
	const data = await DiscountModel.getItemFrontend(code);
	
	res.send({data});
});

module.exports = router;