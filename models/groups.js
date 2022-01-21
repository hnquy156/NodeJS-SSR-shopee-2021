const util = require('util');

const NotifyConfig = require(__path_configs + 'notify');
const GroupsModels = require(__path_schemas + 'groups');

module.exports = {
    getList: (condition, options) => {
        return GroupsModels
            .find(condition, options.select)
            .sort(options.sort)
            .skip(options.skip)
            .limit(options.limit);
    },

    getItem: (id, options = null) => {
        return GroupsModels.findOne({_id: id});
    },

    countItems: (condition) => {
        return GroupsModels.countDocuments(condition);
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
            await GroupsModels.updateOne({_id: id}, data);
            return {id, status, notify: NotifyConfig.CHANGE_STATUS_SUCCESS};
        }
        if (options.task === 'change-status-multi') {
            data.status = currentStatus;
            return GroupsModels.updateMany({_id: { $in: id}}, data);
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
            await GroupsModels.updateOne({_id: id}, data);
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
            await GroupsModels.updateOne({_id: id}, data);
            return {id, ordering: +ordering, notify: NotifyConfig.CHANGE_ORDERING_SUCCESS}
        }
        if (options.task === 'change-ordering-multi') {
            const promiseOrdering = id.map((ID, index) => {
                data.ordering = +ordering[index]
                return GroupsModels.updateOne({_id: ID}, data);
            });
            return await Promise.all(promiseOrdering);
        }
    },

    deleteItem: (id, options) => {
        if (options.task === 'delete-one')
            return GroupsModels.deleteOne({_id: id});
        if (options.task === 'delete-multi')
            return GroupsModels.deleteMany({_id: { $in: id}});
    },

    saveItem: (item, options) => {
        
        if (options.task === 'add') {
            item.created = {
                user_id: '',
                user_name: 'Admin',
                time: Date.now(),
            }
            return GroupsModels(item).save();

        }
        if (options.task === 'edit') {
            item.modified = {
                user_id: '',
                user_name: 'Admin',
                time: Date.now(),
            }
            return GroupsModels.updateOne({_id: item.id}, item);
        }
    },
}