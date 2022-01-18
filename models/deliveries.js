const util = require('util');

const NotifyConfig = require(__path_configs + 'notify');
const DeliveriesModels = require(__path_schemas + 'deliveries');

module.exports = {
    getList: (condition, options) => {
        return DeliveriesModels
            .find(condition)
            .sort(options.sort)
            .skip(options.skip)
            .limit(options.limit);
    },

    getListFrontend: async (options = null, params = null) => {

        const condition = {status: 'active'};
        let select = 'name code transport_fee';
        let sort = 'name';
        let skip = null;
        let limit = null;

        if (options.task === 'list') {
            return DeliveriesModels.find(condition).select(select).sort(sort).skip(skip).limit(limit);
        }

        return DeliveriesModels.find(condition).select(select).sort(sort).skip(skip).limit(limit);
    },

    getItem: (id, options = null) => {
        return DeliveriesModels.findById({_id: id});
    },

    countItems: (condition) => {
        return DeliveriesModels.countDocuments(condition);
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
            await DeliveriesModels.updateOne({_id: id}, data);
            return {id, status, notify: NotifyConfig.CHANGE_STATUS_SUCCESS};
        }
        if (options.task === 'change-status-multi') {
            data.status = currentStatus;
            return DeliveriesModels.updateMany({_id: { $in: id}}, data);
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
            await DeliveriesModels.updateOne({_id: id}, data);
            return {id, ordering: +ordering, notify: NotifyConfig.CHANGE_ORDERING_SUCCESS}
        }
        if (options.task === 'change-ordering-multi') {
            const promiseOrdering = id.map((ID, index) => {
                data.ordering = +ordering[index]
                return DeliveriesModels.updateOne({_id: ID}, data);
            });
            return await Promise.all(promiseOrdering);
        }
    },

    deleteItem: (id, options) => {
        if (options.task === 'delete-one')
            return DeliveriesModels.deleteOne({_id: id});
        if (options.task === 'delete-multi')
            return DeliveriesModels.deleteMany({_id: { $in: id}});
    },

    saveItem: (item, options) => {
        
        if (options.task === 'add') {
            item.created = {
                user_id: '',
                user_name: 'Admin',
                time: Date.now(),
            }
            return DeliveriesModels(item).save();

        }
        if (options.task === 'edit') {
            item.modified = {
                user_id: '',
                user_name: 'Admin',
                time: Date.now(),
            }
            return DeliveriesModels.updateOne({_id: item.id}, item);
        }
    },

    saveAPIs: (items, options = null) => {
        
        return DeliveriesModels.create(items);
    },
}