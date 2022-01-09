const util = require('util');

const NotifyConfigs = require(__path_configs + 'notify');

const options = {
    username: {min: 3, max: 20},
    password: {min: 3, max: 20},
}

module.exports = {
    formValidate: (body) => [
        // username
        body('username', util.format(NotifyConfigs.ERROR_NAME, options.username.min, options.username.max))
            .isLength(options.username),

        // password
        body('password', util.format(NotifyConfigs.ERROR_NAME, options.password.min, options.password.max))
            .isLength(options.password),

    ],
}