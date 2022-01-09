const util = require('util');
const fs = require('fs');

const NotifyConfig = require(__path_configs + 'notify');
const ArticlesModels = require(__path_schemas + 'articles');
const CategoriesModels = require(__path_schemas + 'categories');
const FileHelpers = require(__path_helpers + 'file');
const folderUploads = `${__path_uploads}articles/`;
const stringsHelpers = require(__path_helpers + 'string');

module.exports = {
    getList: (condition, options) => {
        return ArticlesModels
            .find(condition)
            .sort(options.sort)
            .skip(options.skip)
            .limit(options.limit);
    },

    getListFrontend: async (options = null, params = null) => {
        let categories = await CategoriesModels.find({status: 'active'}, 'name');
        categories = categories.map(category => category.name);

        const condition = {status: 'active', 'group.name': {$in: categories}};
        let select = 'name thumb slug content created group';
        let sort = {'created.time': 'desc'};
        let skip = null;
        let limit = null;

        if (options.task === 'articles-new') {
            return ArticlesModels.find(condition).select(select).sort(sort).skip(skip).limit(limit);
        }

        if (options.task === 'articles-special') {
            condition.special = 'active';
            sort = {'ordering': 'asc'};
            limit = 5;
            return ArticlesModels.find(condition).select(select).sort(sort).skip(skip).limit(limit);
        }
        if (options.task === 'articles-random') {
            return ArticlesModels.aggregate([
                { $match: {status: 'active'}},
                { $project: {_id: 1, name: 1, created: 1, thumb: 1, slug: 1 }},
                { $sample: {size: 4}},
            ]);
        }
        if (options.task === 'articles-in-category') {
            condition['group.id'] = params.id;
        }

        return ArticlesModels.find(condition).select(select).sort(sort).skip(skip).limit(limit);
    },

    getItem: (id, options = null) => {
        return ArticlesModels.findById({_id: id});
    },

    getItemFrontend: (id, options = null) => {
        return ArticlesModels.findById({_id: id});
    },

    countItems: (condition) => {
        return ArticlesModels.countDocuments(condition);
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
            await ArticlesModels.updateOne({_id: id}, data);
            return {id, status, notify: NotifyConfig.CHANGE_STATUS_SUCCESS};
        }
        if (options.task === 'change-status-multi') {
            data.status = currentStatus;
            return ArticlesModels.updateMany({_id: { $in: id}}, data);
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
            await ArticlesModels.updateOne({_id: id}, data);
            return {id, special, notify: NotifyConfig.CHANGE_SPECIAL_SUCCESS};
        }
        if (options.task === 'change-special-multi') {
            data.special = currentSpecial;
            return ArticlesModels.updateMany({_id: { $in: id}}, data);
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
            await ArticlesModels.updateOne({_id: id}, data);
            return {id, ordering: +ordering, notify: NotifyConfig.CHANGE_ORDERING_SUCCESS}
        }
        if (options.task === 'change-ordering-multi') {
            const promiseOrdering = id.map((ID, index) => {
                data.ordering = +ordering[index]
                return ArticlesModels.updateOne({_id: ID}, data);
            });
            return await Promise.all(promiseOrdering);
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
            await ArticlesModels.updateOne({_id: id}, data);
            return {id, notify: NotifyConfig.CHANGE_GROUP};
        }
    },

    deleteItem: async (id, options) => {
        if (options.task === 'delete-one') {
            const item = await ArticlesModels.findById(id);
            FileHelpers.removeFile(folderUploads, item.thumb);
            return ArticlesModels.deleteOne({_id: id});
        }
        if (options.task === 'delete-multi') {
            const items = await ArticlesModels.find({_id: { $in: id}}, 'thumb');
            items.forEach(item => FileHelpers.removeFile(folderUploads, item.thumb));
            return ArticlesModels.deleteMany({_id: { $in: id}});
        }
    },

    saveItem: (item, options) => {
        const user = options.user;
        item.slug = stringsHelpers.changeToSlug(item.slug);
        item['group.id'] = item.group_id;
        item['group.name'] = item.group_name;

        if (options.task === 'add') {
            item.created = {
                user_id: user.id,
                user_name: user.username,
                time: Date.now(),
            }
            return ArticlesModels(item).save();

        }
        if (options.task === 'edit') {
            item.modified = {
                user_id: user.id,
                user_name: user.username,
                time: Date.now(),
            }
            return ArticlesModels.updateOne({_id: item.id}, item);
        }
    },
}