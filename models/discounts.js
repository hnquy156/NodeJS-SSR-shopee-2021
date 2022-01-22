const NotifyConfig = require(__path_configs + 'notify');
const ItemsModels = require(__path_schemas + 'discounts');

module.exports = {
    getList: (condition, options) => {
        return ItemsModels
            .find(condition)
            .sort(options.sort)
            .skip(options.skip)
            .limit(options.limit);
    },

    getItem: (id, options = null) => {
        return ItemsModels.findById({_id: id});
    },

    getItemFrontend: (name, options = null) => {
        return ItemsModels.findOne({name: name});
    },

    countItems: (condition) => {
        return ItemsModels.countDocuments(condition);
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
            await ItemsModels.updateOne({_id: id}, data);
            return {id, status, notify: NotifyConfig.CHANGE_STATUS_SUCCESS};
        }
        if (options.task === 'change-status-multi') {
            data.status = currentStatus;
            return ItemsModels.updateMany({_id: { $in: id}}, data);
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
            await ItemsModels.updateOne({_id: id}, data);
            return {id, ordering: +ordering, notify: NotifyConfig.CHANGE_ORDERING_SUCCESS}
        }
        if (options.task === 'change-ordering-multi') {
            const promiseOrdering = id.map((ID, index) => {
                data.ordering = +ordering[index]
                return ItemsModels.updateOne({_id: ID}, data);
            });
            return await Promise.all(promiseOrdering);
        }
    },

    changeName: async (id, name, options) => {
        const user = options.user;
        const data = {
            name: +name,
            modified: {
                user_id: user.id,
                user_name: user.username,
                time: Date.now(),
            },
        }
        if (options.task === 'change-name') {
            await ItemsModels.updateOne({_id: id}, data);
            return {id, name: +name, notify: NotifyConfig.CHANGE_CODE_SUCCESS}
        }
    },

    changeValue: async (id, value, options) => {
        const user = options.user;
        const data = {
            value: +value,
            modified: {
                user_id: user.id,
                user_name: user.username,
                time: Date.now(),
            },
        }
        if (options.task === 'change-value') {
            await ItemsModels.updateOne({_id: id}, data);
            return {id, value: +value, notify: NotifyConfig.CHANGE_VALUE_SUCCESS}
        }
    },

    changeTimes: async (id, times, options) => {
        const user = options.user;
        const data = {
            times: +times,
            modified: {
                user_id: user.id,
                user_name: user.username,
                time: Date.now(),
            },
        }
        if (options.task === 'change-times') {
            await ItemsModels.updateOne({_id: id}, data);
            return {id, times: +times, notify: NotifyConfig.CHANGE_TIMES_SUCCESS}
        }
    },

    deleteItem: (id, options) => {
        if (options.task === 'delete-one')
            return ItemsModels.deleteOne({_id: id});
        if (options.task === 'delete-multi')
            return ItemsModels.deleteMany({_id: { $in: id}});
    },

    saveItem: (item, options) => {
        
        if (options.task === 'add') {
            item.created = {
                user_id: '',
                user_name: 'Admin',
                time: Date.now(),
            }
            return ItemsModels(item).save();

        }
        if (options.task === 'edit') {
            item.modified = {
                user_id: '',
                user_name: 'Admin',
                time: Date.now(),
            }
            return ItemsModels.updateOne({_id: item.id}, item);
        }
    },
}