const express = require('express');
const router = express.Router();

const ProductModel = require(__path_models + 'products');

const collectionName = 'products'
const folderView = `${__path_views_frontend}pages/${collectionName}`;
const layout = __path_views_frontend + 'layouts/layout';
const pageTitle = 'Sản phẩm';


/* get load more */
router.get('/load-more', async (req, res) => {
	const page		    = req.query.page;
	const task 			= 'products-load-more';
	const user 			= req.user;
	
	const data 			= await ProductModel.getListFrontend({task}, {page});
	
	res.send({data, user});
});

/* POST change like  */
router.post('/change-like/', async (req, res) => {
	const id		    = req.body.id;
	const task 			= 'change-like';
	const user 			= req.user;
	
	if (!user) return res.end();
	
	const data = await ProductModel.changeLike(id, {task, user});
	res.send(data);
	// NotifyHelpers.showNotifyAndRedirect(req, res, linkIndex, {task: 'change-like'});
});

/* GET product page. */
router.get('/:id', async (req, res, next) => {
	const id = req.params.id;
	
	const productItem  = await ProductModel.getItemFrontend(id);
	const products 	   = await ProductModel.getListFrontend({task: 'products-in-category'}, {id: productItem.group.id});

	res.render(`${folderView}/index`, { 
		pageTitle, 
		layout, 
		productItem,
		products,
	});
});

module.exports = router;