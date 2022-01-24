const NotifyConfig = require(__path_configs + 'notify');
const ProductsModels = require(__path_schemas + 'products');
const CategoriesModels = require(__path_schemas + 'categories');
const FileHelpers = require(__path_helpers + 'file');
const folderUploads = `${__path_uploads}products/`;
const stringsHelpers = require(__path_helpers + 'string');

module.exports = {
    getList: (condition, options) => {
        return ProductsModels
            .find(condition)
            .sort(options.sort)
            .skip(options.skip)
            .limit(options.limit);
    },

    getListFrontend: async (options = null, params = null) => {
        const user = options.user ? options.user: {id: '', name: ''};
        let categories = await CategoriesModels.find({status: 'active'}, 'name');
        categories = categories.map(category => category.name);

        let condition = {status: 'active', 'group.name': {$in: categories}};
        let select = 'name price sold like thumb slug content created group';
        let sort = {'created.time': 'desc'};
        let skip = null;
        let limit = null;

        if (options.task === 'products-new') {
            limit = 12;
            return ProductsModels.find(condition).select(select).sort(sort).skip(skip).limit(limit);
        }

        if (options.task === 'products-load-more') {
            limit = 12;
            skip = (params.page - 1) * limit;
            return ProductsModels.find(condition).select(select).sort(sort).skip(skip).limit(limit);
        }

        if (options.task === 'products-special') {
            condition.special = 'active';
            sort = {'ordering': 'asc'};
            
            return ProductsModels.find(condition).select(select).sort(sort).skip(skip).limit(limit);
        }

        if (options.task === 'products-soldout') {
            sort = {'sold': 'desc'};
            limit = 12;

            return ProductsModels.find(condition).select(select).sort(sort).skip(skip).limit(limit);
        }

        if (options.task === 'products-random') {
            return ProductsModels.aggregate([
                { $match: {status: 'active'}},
                { $project: {_id: 1, name: 1, created: 1, thumb: 1, slug: 1 }},
                { $sample: {size: 4}},
            ]);
        }
        if (options.task === 'products-in-category') {
            condition['group.id'] = params.id;
        }
        if (options.task === 'products-favourite') {
            condition['like.user_id'] = {$in: user.id};
        }

        if (options.task === 'products-filter') {
            condition['price.price_new'] = {
                $gte: params.price_from ? +params.price_from : 0,
                $lte: params.price_to   ? +params.price_to : Infinity,
            };
            if (params.categories && params.categories.length > 0) condition['group.id'] = {$in: params.categories}
            if (params.sort_type) sort = params.sort_type;
        }

        return ProductsModels.find(condition).select(select).sort(sort).skip(skip).limit(limit);
    },

    getItem: (id, options = null) => {
        return ProductsModels.findById({_id: id});
    },

    getItemFrontend: (id, options = null) => {
        return ProductsModels.findById(id);
    },

    countItems: (condition) => {
        return ProductsModels.countDocuments(condition);
    },

    changeStatus: async (id, currentStatus, options) => {
        const user = options.user;
	    const status		= currentStatus === 'active' ? 'inactive' : 'active';
        const data = {
            status,
            modified: {
                user_id: user.id,
                user_name: user.username,
                time: Date.now(),
            },
        }

        if (options.task === 'change-status-one') {
            await ProductsModels.updateOne({_id: id}, data);
            return {id, status, notify: NotifyConfig.CHANGE_STATUS_SUCCESS};
        }
        if (options.task === 'change-status-multi') {
            data.status = currentStatus;
            return ProductsModels.updateMany({_id: { $in: id}}, data);
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
            await ProductsModels.updateOne({_id: id}, data);
            return {id, special, notify: NotifyConfig.CHANGE_SPECIAL_SUCCESS};
        }
        if (options.task === 'change-special-multi') {
            data.special = currentSpecial;
            return ProductsModels.updateMany({_id: { $in: id}}, data);
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
            await ProductsModels.updateOne({_id: id}, data);
            return {id, ordering: +ordering, notify: NotifyConfig.CHANGE_ORDERING_SUCCESS}
        }
        if (options.task === 'change-ordering-multi') {
            const promiseOrdering = id.map((ID, index) => {
                data.ordering = +ordering[index]
                return ProductsModels.updateOne({_id: ID}, data);
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
            await ProductsModels.updateOne({_id: id}, data);
            return {id, sold: +sold, notify: NotifyConfig.CHANGE_SOLD_SUCCESS}
        }
        if (options.task === 'change-sold-multi') {
            const productsPromise = [];
            id.forEach(product => {
                productsPromise.push(ProductsModels.updateOne({_id: product.product}, {$inc: {sold: product.quantity}}));
            });
            return await Promise.all(productsPromise);
        }
    },

    changeLike: async (id, options) => {
        const user = options.user;
        
        if (options.task === 'change-like') {
            const isLiked = await ProductsModels.findOne({_id: id, 'like.user_id': { $in: user.id}});
            if (isLiked) {
                await ProductsModels.updateOne({_id: id}, {
                    $inc: {'like.total': -1},
                    $pull: {'like.user_id': user.id}
                });
            } else {
                await ProductsModels.updateOne({_id: id}, {
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
            await ProductsModels.updateOne({_id: id}, data);
            return {id, notify: NotifyConfig.CHANGE_GROUP};
        }
    },

    deleteItem: async (id, options) => {
        if (options.task === 'delete-one') {
            const item = await ProductsModels.findById(id);
            FileHelpers.removeFile(folderUploads, item.thumb);
            return ProductsModels.deleteOne({_id: id});
        }
        if (options.task === 'delete-multi') {
            const items = await ProductsModels.find({_id: { $in: id}}, 'thumb');
            items.forEach(item => FileHelpers.removeFile(folderUploads, item.thumb));
            return ProductsModels.deleteMany({_id: { $in: id}});
        }
    },

    saveItem: (item, options) => {
        const user = options.user;
        item.slug = stringsHelpers.changeToSlug(item.slug);
        item['group.id'] = item.group_id;
        item['group.name'] = item.group_name;
        item['price.price_old'] = item.price_old;
        item['price.price_new'] = item.price_new;

        if (options.task === 'add') {
            item.created = {
                user_id: user.id,
                user_name: user.username,
                time: Date.now(),
            }
            item.sold = 0;
            item.like = {
                total: 0,
                user_id: [],
            };
            return ProductsModels(item).save();

        }
        if (options.task === 'edit') {
            item.modified = {
                user_id: user.id,
                user_name: user.username,
                time: Date.now(),
            }
            return ProductsModels.updateOne({_id: item.id}, item);
        }
    },
}