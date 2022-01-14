const express = require('express');
const router = express.Router();

const collectionName = 'contact';
const MainModel = require(__path_models + 'contacts');
const ProductModel = require(__path_models + 'products');
const CategoryModel = require(__path_models + 'categories');
const folderView = `${__path_views_frontend}pages/${collectionName}`;
const layout = __path_views_frontend + 'layouts/layout';
const pageTitle = 'Contact Us';

/* GET contact page. */
router.get('/', async (req, res, next) => {

	res.render(`${folderView}/index`, { 
		pageTitle, 
		layout,
	});
});

/* GET contact sent page. */
router.get('/success', async (req, res, next) => {

	res.render(`${folderView}/success`, { 
		pageTitle, 
		layout,
	});
});

// POST Contact Page
router.post('/', async (req, res) => {
	const contactItem = req.body;

	const result = await MainModel.saveItem(contactItem, {task: 'add'});
	res.redirect('/contacts/success');
});

module.exports = router;