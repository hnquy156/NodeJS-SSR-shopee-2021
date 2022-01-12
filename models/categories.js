const util = require('util');

const NotifyConfig = require(__path_configs + 'notify');
const CategoriesModels = require(__path_schemas + 'categories');
const stringsHelpers = require(__path_helpers + 'string');

module.exports = {
    getList: (condition, options) => {
        return CategoriesModels
            .find(condition, options.select)
            .sort(options.sort)
            .skip(options.skip)
            .limit(options.limit);
    },

    getListFrontend: (options = null, params = null) => {
        const condition = {status: 'active'};
        let select = 'name slug thumb content created';
        let sort = {'ordering': 'asc'};
        let skip = null;
        let limit = null;

        if (options.task === 'categories-list') {
            return CategoriesModels.find(condition).select(select).sort(sort).skip(skip).limit(limit);
        }

        
    },

    getItem: (id, options = null) => {
        return CategoriesModels.findById({_id: id});
    },

    countItems: (condition) => {
        return CategoriesModels.countDocuments(condition);
    },

    changeStatus: async (id, currentStatus, options) => {
	    const status		= currentStatus === 'active' ? 'inactive' : 'active';
        const data = {
            status,
            modified: {
                user_id: '',
                user_name: 'Admin',
                time: Date.now(),
            },
        }

        if (options.task === 'change-status-one') {
            await CategoriesModels.updateOne({_id: id}, data);
            return {id, status, notify: NotifyConfig.CHANGE_STATUS_SUCCESS};
        }
        if (options.task === 'change-status-multi') {
            data.status = currentStatus;
            return CategoriesModels.updateMany({_id: { $in: id}}, data);
        }
    },

    changeGroupACP: async (id, currentGroupACP, options) => {
	    const group_acp = currentGroupACP === 'yes' ? 'no' : 'yes';
        const data = {
            group_acp,
            modified: {
                user_id: '',
                user_name: 'Admin',
                time: Date.now(),
            },
        }
        if (options.task === 'change-group-acp') {
            await CategoriesModels.updateOne({_id: id}, data);
            return {id, group_acp, notify: NotifyConfig.CHANGE_GROUP_ACP_SUCCESS};
        }
    },

    changeOrdering: async (id, ordering, options) => {
        const data = {
            ordering: +ordering,
            modified: {
                user_id: '',
                user_name: 'Admin',
                time: Date.now(),
            },
        }
        if (options.task === 'change-ordering-one') {
            await CategoriesModels.updateOne({_id: id}, data);
            return {id, ordering: +ordering, notify: NotifyConfig.CHANGE_ORDERING_SUCCESS}
        }
        if (options.task === 'change-ordering-multi') {
            const promiseOrdering = id.map((ID, index) => {
                data.ordering = +ordering[index]
                return CategoriesModels.updateOne({_id: ID}, data);
            });
            return await Promise.all(promiseOrdering);
        }
    },

    deleteItem: (id, options) => {
        if (options.task === 'delete-one')
            return CategoriesModels.deleteOne({_id: id});
        if (options.task === 'delete-multi')
            return CategoriesModels.deleteMany({_id: { $in: id}});
    },

    saveItem: (item, options) => {
        item.slug = stringsHelpers.changeToSlug(item.slug);
        
        if (options.task === 'add') {
            item.created = {
                user_id: '',
                user_name: 'Admin',
                time: Date.now(),
            }
            return CategoriesModels(item).save();

        }
        if (options.task === 'edit') {
            item.modified = {
                user_id: '',
                user_name: 'Admin',
                time: Date.now(),
            }
            return CategoriesModels.updateOne({_id: item.id}, item);
        }
    },
}