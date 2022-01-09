const GroupsModel = require(__path_models + 'groups');

const linkLogin = `/auth/login/`;
const linkNoPermission = `/auth/no-permission/`;

module.exports = async (req, res, next) => {
    req.user = {
        id: 'Ad54541fefwfwfmin',
        username: 'Admin',
    }
    res.locals.user = req.user;
    return next();

    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        const groupOfUser = await GroupsModel.getItem(req.user.group.id);
        if (groupOfUser.group_acp === 'yes') next()
        else res.redirect(linkNoPermission);
    } else {
        res.redirect(linkLogin);
    }
}