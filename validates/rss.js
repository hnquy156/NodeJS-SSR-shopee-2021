const util = require('util');

const NotifyConfigs = require(__path_configs + 'notify');

const options = {
    name: {min: 3, max: 100},
    status: {value: 'default' },
    ordering: {gt: 0, lt: 100},
    rss_link: {min: 1, max: 200},
}

module.exports = {
    formValidate: (body) => [
        // name
        body('name', util.format(NotifyConfigs.ERROR_NAME, options.name.min, options.name.max))
            .isLength(options.name),

        // status
        body('status', NotifyConfigs.ERROR_STATUS).custom(value => value !== options.status.value),

        // ordering
        body('ordering', util.format(NotifyConfigs.ERROR_ORDERING, options.ordering.gt, options.ordering.lt))
            .isInt(options.ordering),

        // rss link
        body('rss_link', util.format(NotifyConfigs.ERROR_NAME, options.rss_link.min, options.rss_link.max))
        .isLength(options.rss_link),
    ],
}