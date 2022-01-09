const util = require('util');

const NotifyConfigs = require(__path_configs + 'notify');

const options = {
    name: {min: 3, max: 100},
    status: {value: 'default' },
    ordering: {gt: 0, lt: 100},
    slug: {min: 3, max: 100},
    content: {min: 1, max: 100},
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

        // slug
        body('slug', util.format(NotifyConfigs.ERROR_NAME, options.slug.min, options.slug.max))
            .isLength(options.slug),

        // content
        body('content', util.format(NotifyConfigs.ERROR_NAME, options.content.min, options.content.max))
        .isLength(options.content),
    ],
}