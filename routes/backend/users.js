const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');

const collectionName = 'users';
const MainController = require(__path_controllers_admin + collectionName);
const FileHelpers = require(__path_helpers + 'file');
const Validates = require(__path_validates + collectionName);


router.get('/filter-group/:group_id', MainController.filterGroup);
router.get('/sort/:sortField/:sortType', MainController.sort);
router.post('/change-ordering', MainController.changeOrdering);
router.get('/delete/:id', MainController.deleteOne);
router.post('/delete/', MainController.deleteMulti);
router.post('/change-group', MainController.changeGroup);
router.get('/change-status/:status/:id', MainController.changeStatusOne);
router.post('/change-status/:status', MainController.changeStatusMulti);
router.get('(/status/:status)?', MainController.index);
// Get FORM --- ADD/EDIT
router.get('/form(/:id)?', MainController.getForm);
router.post('/form', FileHelpers.upload('avatar', 'users'), Validates.formValidate(body), MainController.postForm);

module.exports = router;
