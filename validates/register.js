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
        body('username', NotifyConfigs.ERROR_USERNAME_SPACE)
            .isLength(options.username)
            .withMessage(util.format(NotifyConfigs.ERROR_NAME, options.username.min, options.username.max))
            .custom(value => !/\s/.test(value)),

        // password
        body('password', util.format(NotifyConfigs.ERROR_NAME, options.password.min, options.password.max))
            .isLength(options.password),

        body('password_confirm', NotifyConfigs.ERROR_PASSWORD_CONFIRM)
            .custom((value, { req }) => value === req.body.password),

    ],
}