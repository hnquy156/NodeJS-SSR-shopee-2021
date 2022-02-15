const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');

const collectionName = 'discounts';
const MainController = require(__path_controllers_admin + collectionName);
const Validates = require(__path_validates + collectionName);


router.post('/change-name', MainController.changeName);
router.post('/change-value', MainController.changeValue);
router.post('/change-times', MainController.changeTimes);
router.get('/sort/:sortField/:sortType', MainController.sort);
router.post('/change-ordering', MainController.changeOrdering);
router.get('/delete/:id', MainController.deleteOne);
router.post('/delete/', MainController.deleteMulti);
router.get('/change-status/:status/:id', MainController.changeStatusOne);
router.post('/change-status/:status', MainController.changeStatusMulti);
router.get('(/status/:status)?', MainController.index);
// FORM --- ADD/EDIT
router.get('/form(/:id)?', MainController.getForm);
router.post('/form', Validates.formValidate(body), MainController.postForm);

module.exports = router;
