const GroupsModel = require(__path_models + 'groups');
const UsersModel = require(__path_models + 'users');

const linkLogin = `/auth/login/`;
const linkNoPermission = `/auth/no-permission/`;

module.exports = async (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        return next()
    } else {
        return res.redirect(linkLogin);
    }
}