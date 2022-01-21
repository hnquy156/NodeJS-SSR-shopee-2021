const GroupsModel = require(__path_models + 'groups');
const UsersModel = require(__path_models + 'users');

const linkLogin = `/auth/login/`;
const linkNoPermission = `/auth/no-permission/`;

module.exports = async (req, res, next) => {
    // req.user = await UsersModel.getItem('61e2e5e1de85e7fa65800173');
    // res.locals.user = req.user;
    // return next();

    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        const groupOfUser = await GroupsModel.getItem(req.user.group.id);
        if (groupOfUser && groupOfUser.group_acp === 'yes') return next()
        else return res.redirect(linkNoPermission);
    } else {
        return res.redirect(linkLogin);
    }
}