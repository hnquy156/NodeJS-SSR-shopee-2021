const collectionName = 'contact';
const MainModel = require(__path_models + 'contacts');
const folderView = `${__path_views_frontend}pages/${collectionName}`;
const layout = __path_views_frontend + 'layouts/layout';
const pageTitle = 'Liên hệ với chúng tôi';

module.exports = {
	index: async (req, res, next) => {

		res.render(`${folderView}/index`, { 
			pageTitle, 
			layout,
		});
	},
	success: async (req, res, next) => {

		res.render(`${folderView}/success`, { 
			pageTitle, 
			layout,
		});
	},
	sendContact: async (req, res) => {
		const contactItem = req.body;
	
		const result = await MainModel.saveItem(contactItem, {task: 'add'});
		res.redirect('/contacts/success');
	}
}