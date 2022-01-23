const { NotImplemented } = require('http-errors');
const util = require('util');

const NotifyConfigs = require(__path_configs + 'notify');
const UsersModel = require(__path_models + 'users');

const options = {
    name: {min: 3, max: 100},
    username: {min: 3, max: 20},
    password: {min: 3, max: 20},
    status: {value: 'default' },
    group: {value: 'default' },
    ordering: {gt: 0, lt: 100},
    content: {min: 1, max: 100},
}

module.exports = {
    formValidate: (body) => [
        // name
        body('name', util.format(NotifyConfigs.ERROR_NAME, options.name.min, options.name.max))
            .isLength(options.name),

        // username
        body('username', util.format(NotifyConfigs.ERROR_NAME, options.username.min, options.username.max))
            .isLength(options.username),

        // password
        body('password', util.format(NotifyConfigs.ERROR_NAME, options.password.min, options.password.max))
            .isLength(options.password),

        body('password_confirm', NotifyConfigs.ERROR_PASSWORD_CONFIRM)
            .custom((value, { req }) => value === req.body.password),

        // status
        body('status', NotifyConfigs.ERROR_STATUS).custom(value => value !== options.status.value),

        // group
        body('group_id', NotifyConfigs.ERROR_GROUP).custom(value => value !== options.group.value),

        // ordering
        body('ordering', util.format(NotifyConfigs.ERROR_ORDERING, options.ordering.gt, options.ordering.lt))
            .isInt(options.ordering),

        // content
        body('content', util.format(NotifyConfigs.ERROR_NAME, options.content.min, options.content.max))
        .isLength(options.content),
    ],

    formFrontendValidate: (body) => [
        // name
        body('name', util.format(NotifyConfigs.ERROR_NAME, options.name.min, options.name.max))
            .isLength(options.name),
    ],

    passwordFrontendValidate: (body) => [
        // password_old
        body('password_old', util.format(NotifyConfigs.ERROR_NAME, options.password.min, options.password.max))
            .isLength(options.password),

        // password
        body('password', util.format(NotifyConfigs.ERROR_NAME, options.password.min, options.password.max))
            .isLength(options.password),

        // password_confirm
        body('password_confirm', NotifyConfigs.ERROR_PASSWORD_CONFIRM)
            .custom((value, { req }) => value === req.body.password),
    ],
}