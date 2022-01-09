const express = require('express');
const router = express.Router();

const ArticlesModel = require(__path_models + 'articles');

const collectionName = 'articles'
const folderView = `${__path_views_frontend}pages/${collectionName}`;
const layout = __path_views_frontend + 'layouts/layout';
const pageTitle = 'Articles';

/* GET home page. */
router.get('/:id/:article', async (req, res, next) => {
	const id = req.params.id;
	const articleItem = await ArticlesModel.getItemFrontend(id);
	const categoryArticles = await ArticlesModel.getListFrontend({task: 'articles-in-category'}, {id: articleItem.group.id});

	res.render(`${folderView}/index`, { 
		pageTitle, 
		layout, 
		articleItem,
		categoryArticles,
	});
});

module.exports = router;