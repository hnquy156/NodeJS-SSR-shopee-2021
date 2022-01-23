const util = require('util');
const notifyConfig = require(__path_configs + 'notify');

const showNotifyAndRedirect = async (req, res, linkRedirect, params = null) => {
	let notify = '';
	let notifyColor = params.class ? params.class : 'success';
	switch (params.task) {
		case 'add':
			notify = notifyConfig.ADD_SUCCESS;
			break;
		case 'edit-info':
			notify = notifyConfig.CHANGE_USER_SUCCESS;
			break;
		case 'edit':
			notify = notifyConfig.EDIT_SUCCESS;
			break;
		case 'change-status-one':
			notify = notifyConfig.CHANGE_STATUS_SUCCESS;
			break;	
		case 'change-status-multi':
			notify = util.format(notifyConfig.CHANGE_STATUS_MULTI_SUCCESS, params.total);
			break;			
		case 'change-ordering':
			notify = notifyConfig.CHANGE_ORDERING_SUCCESS;
			break;	
		case 'change-group-acp':
			notify = notifyConfig.CHANGE_GROUP_ACP_SUCCESS;
			break;	
		case 'delete-one':
			notify = notifyConfig.DELETE_SUCCESS;
			break;	
		case 'delete-multi':
			notify = util.format(notifyConfig.DELETE_MULTI_SUCCESS, params.total);
			break;	
			
		default:
			notify = '';
			break;
	}
	req.flash('notify', notifyColor +'|'+ notify);
	res.redirect(linkRedirect);
}
module.exports = {
    showNotifyAndRedirect,
}