const { body, validationResult } = require('express-validator');

const collectionName = 'items';
const MainModel = require(__path_models + collectionName);
const UtilsHelpers = require(__path_helpers + 'utils');
const ParamsHelpers = require(__path_helpers + 'params');
const NotifyHelpers = require(__path_helpers + 'notify');
const systemConfigs = require(__path_configs + 'system');

const folderView = `${__path_views_admin}pages/${collectionName}`;
const linkIndex = `/${systemConfigs.prefixAdmin}/${collectionName}`;
const pageTitle = "Items Management";

module.exports = {
	sort: async (req, res) => {
		req.session.sortType		    = ParamsHelpers.getParam(req.params, 'sortType', 'asc');
		req.session.sortField		    = ParamsHelpers.getParam(req.params, 'sortField', 'ordering');
	
		res.redirect(linkIndex);
	},
	changeOrdering: async (req, res) => {
		const id		    = ParamsHelpers.getParam(req.body, 'cid', '');
		const ordering		= ParamsHelpers.getParam(req.body, 'ordering', '');
		const task 			= Array.isArray(id) ? 'change-ordering-multi' : 'change-ordering-one';
	
		const data = await MainModel.changeOrdering(id, ordering, {task});
		res.send(data);
	},
	deleteOne: async (req, res) => {
		const id		    = ParamsHelpers.getParam(req.params, 'id', '');
	
		await MainModel.deleteItem(id, {task: 'delete-one'});
		NotifyHelpers.showNotifyAndRedirect(req, res, linkIndex, {task: 'delete-one'});
	},
	deleteMulti: async (req, res) => {
		const id		    = ParamsHelpers.getParam(req.body, 'cid', '');
	
		const result = await MainModel.deleteItem(id, {task: 'delete-multi'});
		NotifyHelpers.showNotifyAndRedirect(req, res, linkIndex, {task: 'delete-multi', total: result.deletedCount});
	},
	changeStatusOne: async (req, res) => {
		const currentStatus = ParamsHelpers.getParam(req.params, 'status', 'active');
		const id		    = ParamsHelpers.getParam(req.params, 'id', '');
	
		const data = await MainModel.changeStatus(id, currentStatus, {task: 'change-status-one'});
		res.send(data);
	},
	changeStatusMulti: async (req, res) => {
		const currentStatus = ParamsHelpers.getParam(req.params, 'status', 'active');
		const id		    = ParamsHelpers.getParam(req.body, 'cid', '');
	
		const result = await MainModel.changeStatus(id, currentStatus, {task: 'change-status-multi'});
		NotifyHelpers.showNotifyAndRedirect(req, res, linkIndex, {task: 'change-status-multi', total: result.modifiedCount});
	},
	index: async (req, res, next) => {
		const condition = {};
		const messages	= req.flash('notify');
		const sortType = ParamsHelpers.getParam(req.session, 'sortType', 'asc');
		const sortField = ParamsHelpers.getParam(req.session, 'sortField', 'ordering');
		const sort = {[sortField]: sortType};
		const currentStatus = ParamsHelpers.getParam(req.params, 'status', 'all');
		const currentPage = ParamsHelpers.getParam(req.query, 'page', 1);
		const search_value = ParamsHelpers.getParam(req.query, 'search_value', '');
	
		if (currentStatus !== 'all') condition.status = currentStatus;
		if (search_value) condition.name = new RegExp(search_value, 'i');
	
		const pagination = {
			itemsTotal: await MainModel.countItems(condition),
			itemsOnPerPage: 6,
			currentPage,
			pageRanges : 3,
		}
		pagination.pagesTotal = Math.ceil(pagination.itemsTotal / pagination.itemsOnPerPage);
		const options = {
			limit: pagination.itemsOnPerPage,
			skip: (pagination.currentPage - 1) * pagination.itemsOnPerPage,
			sort,
		}
	
		const filterStatus = await UtilsHelpers.createFilterStatus(currentStatus, collectionName, condition);
		const items = await MainModel.getList(condition, options);
	
		res.render(`${folderView}/list`, { 
			pageTitle,
			messages,
			items,
			currentStatus,
			filterStatus,
			search_value,
			pagination,
			sortType,
			sortField,
		});
	},
	getForm: async (req, res) => {
		const id = ParamsHelpers.getParam(req.params, 'id', '');
		let item = {id: '', name: '', ordering: 1, content: ''};
		const errors = [];
		const pageTitle = id ? 'Edit' : 'Add';
		item = id ? await MainModel.getItem(id) : item;
		
		res.render(`${folderView}/form`, {pageTitle, errors, item});
	},
	postForm: async (req, res) => {
		const item = req.body;
		const errors = validationResult(req).array();
		const pageTitle = item && item.id ? 'Edit' : 'Add';
		const task = item && item.id ? 'edit' : 'add';
		
		if (errors.length > 0) {
			res.render(`${folderView}/form`, {pageTitle, errors, item});
	
		} else {
			await MainModel.saveItem(item, {task});
			NotifyHelpers.showNotifyAndRedirect(req, res, linkIndex, {task});
		}
	}
}

