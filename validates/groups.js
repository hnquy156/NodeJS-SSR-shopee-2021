const util = require('util');

const NotifyConfigs = require(__path_configs + 'notify');

const options = {
    name: {min: 3, max: 100},
    status: {value: 'default' },
    group_acp: {value: 'default' },
    ordering: {gt: 0, lt: 100},
    content: {min: 1, max: 100},
}

module.exports = {
    formValidate: (body) => [
        // name
        body('name', util.format(NotifyConfigs.ERROR_NAME, options.name.min, options.name.max))
            .isLength(options.name),

        // status
        body('status', NotifyConfigs.ERROR_STATUS).custom(value => value !== options.status.value),

        // status
        body('group_acp', NotifyConfigs.ERROR_GROUP_ACP).custom(value => value !== options.group_acp.value),

        // ordering
        body('ordering', util.format(NotifyConfigs.ERROR_ORDERING, options.ordering.gt, options.ordering.lt))
            .isInt(options.ordering),

        // content
        body('content', util.format(NotifyConfigs.ERROR_NAME, options.content.min, options.content.max))
        .isLength(options.content),
    ],
}