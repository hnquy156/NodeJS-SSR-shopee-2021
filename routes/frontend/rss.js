const express = require('express');
const router = express.Router();

const collectionName = 'rss';
const ArticlesModel = require(__path_models + 'articles');
const rssModel = require(__path_models + 'rss');
const folderView = `${__path_views_frontend}pages/${collectionName}`;
const layout = __path_views_frontend + 'layouts/layout';
const pageTitle = 'RSS';


/* GET category page. */
router.get('/:rssID', async (req, res, next) => {
	const id = req.params.rssID;
	const currentRSS = await rssModel.getItem(id);
	const rssArticles = await rssModel.getListRssItem({categoryID: id});

	res.render(`${folderView}/index`, { 
		pageTitle, 
		layout, 
		currentRSS,
		rssArticles
	});
});

module.exports = router;