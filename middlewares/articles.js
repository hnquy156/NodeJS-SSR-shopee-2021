const ArticlesModel = require(__path_models + 'articles');
const CategoriesModel = require(__path_models + 'categories');
const SettingsModel = require(__path_models + 'settings');
const rssModel = require(__path_models + 'rss');

module.exports = async (req, res, next) => {
	res.locals.user = req.user;
	res.locals.socials = ['linkedin', 'google', 'twitter', 'facebook'];
	res.locals.settings = await SettingsModel.getItemFrontend();
    res.locals.newArticles = await ArticlesModel.getListFrontend({task: 'articles-new'});
	res.locals.filteredArticles = [...res.locals.newArticles].sort((a,b) => {
		if (a.group.name > b.group.name) return 1
		else if (a.group.name < b.group.name) return -1
		else if (a.group.time > b.group.time) return -1
		else return 1;
	});
	res.locals.specialArticles = await ArticlesModel.getListFrontend({task: 'articles-special'});
	res.locals.randomArticles = await ArticlesModel.getListFrontend({task: 'articles-random'});
	res.locals.categoriesList = await CategoriesModel.getListFrontend({task: 'categories-list'});
	res.locals.rssFeeds = await rssModel.getListFrontend({task: 'rss-list'});

    next();
}