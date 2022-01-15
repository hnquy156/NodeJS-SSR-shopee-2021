const ProductsModel = require(__path_models + 'products');
const CategoriesModel = require(__path_models + 'categories');
const SettingsModel = require(__path_models + 'settings');

module.exports = async (req, res, next) => {
	// res.locals.user = req.user;
	// res.locals.socials = ['linkedin', 'google', 'twitter', 'facebook'];
	// res.locals.settings = await SettingsModel.getItemFrontend();
    
	res.locals.categories = await CategoriesModel.getListFrontend({task: 'categories-list'});

    next();
}