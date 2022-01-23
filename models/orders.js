const util = require('util');
const fs = require('fs');

const NotifyConfig = require(__path_configs + 'notify');
const OrdersModels = require(__path_schemas + 'orders');
const CategoriesModels = require(__path_schemas + 'categories');
const ProductsModels = require(__path_models + 'products');
const DiscountModels = require(__path_models + 'discounts');
const FileHelpers = require(__path_helpers + 'file');
const folderUploads = `${__path_uploads}products/`;
const stringsHelpers = require(__path_helpers + 'string');

module.exports = {
    getList: (condition, options) => {
        return OrdersModels
            .find(condition)
            .sort(options.sort)
            .skip(options.skip)
            .limit(options.limit)
            .populate('city')
    },

    getListFrontend: async (options = null, params = null) => {
        let categories = await CategoriesModels.find({status: 'active'}, 'name');
        categories = categories.map(category => category.name);

        const condition = {status: 'active', 'group.name': {$in: categories}};
        let select = 'name price sold like thumb slug content created group';
        let sort = {'created.time': 'desc'};
        let skip = null;
        let limit = null;

        if (options.task === 'products-new') {
            return OrdersModels.find(condition).select(select).sort(sort).skip(skip).limit(limit);
        }

        if (options.task === 'products-special') {
            condition.special = 'active';
            sort = {'ordering': 'asc'};
            
            return OrdersModels.find(condition).select(select).sort(sort).skip(skip).limit(limit);
        }

        if (options.task === 'products-soldout') {
            sort = {'sold': 'desc'};
            limit = 12;

            return OrdersModels.find(condition).select(select).sort(sort).skip(skip).limit(limit);
        }

        if (options.task === 'products-random') {
            return OrdersModels.aggregate([
                { $match: {status: 'active'}},
                { $project: {_id: 1, name: 1, created: 1, thumb: 1, slug: 1 }},
                { $sample: {size: 4}},
            ]);
        }
        if (options.task === 'products-in-category') {
            condition['group.id'] = params.id;
        }

        if (options.task === 'products-filter') {
            condition['price.price_new'] = {
                $gte: params.price_from ? +params.price_from : 0,
                $lte: params.price_to   ? +params.price_to : Infinity,
            };
            if (params.categories && params.categories.length > 0) condition['group.id'] = {$in: params.categories}
            if (params.sort_type) sort = params.sort_type;
        }

        return OrdersModels.find(condition).select(select).sort(sort).skip(skip).limit(limit);
    },

    getItem: (id, options = null) => {
        return OrdersModels.findById({_id: id}).populate('products.product');
    },

    getItemFrontend: (code, options = null) => {
        return OrdersModels.findOne({code});
    },

    countItems: (condition) => {
        return OrdersModels.countDocuments(condition);
    },

    changeStatus: async (id, currentStatus, options) => {
        const user = options.user;
	    const status		= currentStatus;
        const data = {
            status,
            modified: {
                user_id: user.id,
                user_name: user.username,
                time: Date.now(),
            },
        }

        if (options.task === 'change-status-one') {
            await OrdersModels.updateOne({_id: id}, data);
            return {id, status, notify: NotifyConfig.CHANGE_STATUS_SUCCESS};
        }
        if (options.task === 'change-status-multi') {
            data.status = currentStatus;
            return OrdersModels.updateMany({_id: { $in: id}}, data);
        }
    },

    changeSpecial: async (id, currentSpecial, options) => {
        const user = options.user;
	    const special		= currentSpecial === 'active' ? 'inactive' : 'active';
        const data = {
            special,
            modified: {
                user_id: user.id,
                user_name: user.username,
                time: Date.now(),
            },
        }

        if (options.task === 'change-special-one') {
            await OrdersModels.updateOne({_id: id}, data);
            return {id, special, notify: NotifyConfig.CHANGE_SPECIAL_SUCCESS};
        }
        if (options.task === 'change-special-multi') {
            data.special = currentSpecial;
            return OrdersModels.updateMany({_id: { $in: id}}, data);
        }
    },

    changeOrdering: async (id, ordering, options) => {
        const user = options.user;
        const data = {
            ordering: +ordering,
            modified: {
                user_id: user.id,
                user_name: user.username,
                time: Date.now(),
            },
        }
        if (options.task === 'change-ordering-one') {
            await OrdersModels.updateOne({_id: id}, data);
            return {id, ordering: +ordering, notify: NotifyConfig.CHANGE_ORDERING_SUCCESS}
        }
        if (options.task === 'change-ordering-multi') {
            const promiseOrdering = id.map((ID, index) => {
                data.ordering = +ordering[index]
                return OrdersModels.updateOne({_id: ID}, data);
            });
            return await Promise.all(promiseOrdering);
        }
    },

    changeSold: async (id, sold, options) => {
        const user = options.user;
        const data = {
            sold: +sold,
            modified: {
                user_id: user.id,
                user_name: user.username,
                time: Date.now(),
            },
        }
        if (options.task === 'change-sold-one') {
            await OrdersModels.updateOne({_id: id}, data);
            return {id, sold: +sold, notify: NotifyConfig.CHANGE_SOLD_SUCCESS}
        }
    },

    changeLike: async (id, options) => {
        const user = options.user;
        
        if (options.task === 'change-like') {
            const isLiked = await OrdersModels.findOne({_id: id, 'like.user_id': { $in: user.id}});
            if (isLiked) {
                await OrdersModels.updateOne({_id: id}, {
                    $inc: {'like.total': -1},
                    $pull: {'like.user_id': user.id}
                });
            } else {
                await OrdersModels.updateOne({_id: id}, {
                    $inc: {'like.total': 1},
                    $push: {'like.user_id': user.id}
                });
            }
            return {id}
        }
    },

    changeGroup: async (id, group_id, group_name, options) => {
        const user = options.user;
        const data = {
            'group.id': group_id,
            'group.name': group_name,
            modified: {
                user_id: user.id,
                user_name: user.username,
                time: Date.now(),
            },
        }

        if (options.task === 'change-group') {
            await OrdersModels.updateOne({_id: id}, data);
            return {id, notify: NotifyConfig.CHANGE_GROUP};
        }
    },

    deleteItem: async (id, options) => {
        if (options.task === 'delete-one') {
            const item = await OrdersModels.findById(id);
            FileHelpers.removeFile(folderUploads, item.thumb);
            return OrdersModels.deleteOne({_id: id});
        }
        if (options.task === 'delete-multi') {
            const items = await OrdersModels.find({_id: { $in: id}}, 'thumb');
            items.forEach(item => FileHelpers.removeFile(folderUploads, item.thumb));
            return OrdersModels.deleteMany({_id: { $in: id}});
        }
    },

    saveItem: async (item, options) => {
        const user = options.user;
        item.status = 0;
        item.name = user.name;
        item.phone = user.phone;
        item.email = user.email;
        item.code = stringsHelpers.randomStrings(16);

        if (options.task === 'add') {
            item.created = {
                user_id: user.id,
                user_name: user.username,
                time: Date.now(),
            }
            await ProductsModels.changeSold(item.products, 0, {task: 'change-sold-multi', user});
            if (item.discount_id) await DiscountModels.changeTimesFrontend(item.discount_id, {task: 'change-times-after-use'});
            
            return new OrdersModels(item).save();
        }
    },
}