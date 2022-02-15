const DiscountModel = require(__path_models + 'discounts');


module.exports = {
	getDiscountCode: async (req, res, next) => {
		const code = req.params.code;
		const data = await DiscountModel.getItemFrontend(code);
	
		res.send({data});
	}
}