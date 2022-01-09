const ProductsModel = require(__path_models + 'products');
const CategoriesModel = require(__path_models + 'categories');
const SettingsModel = require(__path_models + 'settings');
const rssModel = require(__path_models + 'rss');

module.exports = async (req, res, next) => {
	res.locals.user = req.user;
	res.locals.socials = ['linkedin', 'google', 'twitter', 'facebook'];
	res.locals.settings = await SettingsModel.getItemFrontend();
    res.locals.newProducts = await ProductsModel.getListFrontend({task: 'products-new'});
	res.locals.filteredProducts = [...res.locals.newProducts].sort((a,b) => {
		if (a.group.name > b.group.name) return 1
		else if (a.group.name < b.group.name) return -1
		else if (a.group.time > b.group.time) return -1
		else return 1;
	});
	res.locals.specialProducts = await ProductsModel.getListFrontend({task: 'products-special'});
	res.locals.randomProducts = await ProductsModel.getListFrontend({task: 'products-random'});
	res.locals.categoriesList = await CategoriesModel.getListFrontend({task: 'categories-list'});
	res.locals.rssFeeds = await rssModel.getListFrontend({task: 'rss-list'});

    next();
}