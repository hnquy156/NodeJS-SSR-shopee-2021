const express = require('express');
const router = express.Router();

const collectionName = 'home';
const ArticlesModel = require(__path_models + 'articles');
const CategoriesModel = require(__path_models + 'categories');
const folderView = `${__path_views_frontend}pages/${collectionName}`;
const layout = __path_views_frontend + 'layouts/layout';
const pageTitle = 'Home';

/* GET home page. */
router.get('/', async (req, res, next) => {

	res.render(`${folderView}/index`, { 
		pageTitle, 
		layout,
	});
});

module.exports = router;