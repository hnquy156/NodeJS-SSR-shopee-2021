const GroupsModel = require(__path_models + 'groups');
const CategoriesModel = require(__path_models + 'categories');
const SettingsModel = require(__path_models + 'settings');
const UsersModel = require(__path_models + 'users');
const CartModel = require(__path_models + 'carts');
const SystemConfigs = require(__path_configs + 'system');

module.exports = async (req, res, next) => {
	const user = req.user ? req.user : await UsersModel.getItem(SystemConfigs.guest_id);
	res.locals.isAdmin = false;
	const groupOfUser = user.group && user.group.id ? await GroupsModel.getItem(user.group.id) : false;
    if (groupOfUser && groupOfUser.group_acp === 'yes') res.locals.isAdmin = true;
	res.locals.user = user;
	const cartProducts = await CartModel.getCartProducts(user.cart, null);
	res.locals.cartProducts = cartProducts.products;
	res.locals.categories = await CategoriesModel.getListFrontend({task: 'categories-list'});
	res.locals.settings = await SettingsModel.getItemFrontend({});

    next();
}