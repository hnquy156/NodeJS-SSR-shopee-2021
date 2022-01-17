const NotifyConfig = require(__path_configs + 'notify');
const CartsModels = require(__path_schemas + 'carts');
const CategoriesModels = require(__path_schemas + 'categories');
const FileHelpers = require(__path_helpers + 'file');
const folderUploads = `${__path_uploads}products/`;
const stringsHelpers = require(__path_helpers + 'string');

module.exports = {

    getItem: (id, options = null) => {
        return CartsModels.findById({_id: id});
    },

    getCartProducts: (id, options = null) => {
        return CartsModels
            .findById({_id: id})
            .populate('products.product_id', 'name thumb price');
    },

    deleteItem: async (id, options) => {
        if (options.task === 'delete-one') {
            const item = await CartsModels.findById(id);
            FileHelpers.removeFile(folderUploads, item.thumb);
            return CartsModels.deleteOne({_id: id});
        }
        if (options.task === 'delete-multi') {
            const items = await CartsModels.find({_id: { $in: id}}, 'thumb');
            items.forEach(item => FileHelpers.removeFile(folderUploads, item.thumb));
            return CartsModels.deleteMany({_id: { $in: id}});
        }
    },

    saveItem: async (params, options) => {

        if (options.task === 'add') {
            const cartItem = await CartsModels.findOne({_id: params.cartID});
            if (!cartItem.products) cartItem.products = [];
            const productItem = cartItem.products.find(product => product.product_id == params.productID);
            if (productItem) {
                productItem.quantity += params.quantity;
            } else {
                cartItem.products.push({product_id: params.productID, quantity: params.quantity});
            }
            return CartsModels.updateOne({_id: cartItem.id}, cartItem);

        }
        if (options.task === 'edit') {
            const cartItem =   await CartsModels.findOne({_id: params.cartID})
                                                .populate('products.product_id', 'name price');
            if (!cartItem.products) cartItem.products = [];
            const productItem = cartItem.products.find(product => product.product_id.id == params.productID);
            productItem.quantity = params.quantity;
            await CartsModels.updateOne({_id: cartItem.id}, cartItem);
            return {data: cartItem.products}
        }

        if (options.task === 'delete') {
            
            return CartsModels.updateOne({_id: params.cartID}, {
                $pull: {
                    products: {
                        'product_id': params.productID
                    }
                }
            });

        }
    },
}