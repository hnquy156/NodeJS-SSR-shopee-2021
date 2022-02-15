const DeliveryModel = require(__path_models + 'deliveries');

const collectionName = 'checkouts';
const folderView = `${__path_views_frontend}pages/${collectionName}`;
const layout = __path_views_frontend + 'layouts/layout';
const pageTitle = 'Thanh toán';

module.exports = {
	index: async (req, res, next) => {
		const id = req.params.id;
		const cities = await DeliveryModel.getListFrontend({task: 'list'});
	
		res.render(`${folderView}/index`, { 
			pageTitle, 
			layout, 
			cities,
		});
	}
}