const DeliveryModel = require(__path_models + 'deliveries');


module.exports = {
	getDiscountCode: async (req, res, next) => {
		const id = req.params.id;
		const data = await DeliveryModel.getItemFrontend(id);
		
		res.send({data});
	}
}