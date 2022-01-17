const ProductsModel = require(__path_models + 'products');
const CategoriesModel = require(__path_models + 'categories');
const SettingsModel = require(__path_models + 'settings');
const UsersModel = require(__path_models + 'users');

module.exports = async (req, res, next) => {
	req.user = await UsersModel.getItem('61e2e5e1de85e7fa65800173');
	res.locals.user = req.user;
	// res.locals.socials = ['linkedin', 'google', 'twitter', 'facebook'];
	// res.locals.settings = await SettingsModel.getItemFrontend();
    
	res.locals.categories = await CategoriesModel.getListFrontend({task: 'categories-list'});

    next();
}