const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const collectionName = 'deliveries';
const MainController = require(__path_controllers_admin + collectionName);
const Validates = require(__path_validates + collectionName);

/* TEST API */
router.get('/api-city', MainController.loadApiOutside);

router.post('/change-transport_fee', MainController.changeTransportFee);
router.post('/change-code', MainController.changeCode);
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
