const express = require('express');
const router  = express.Router();

const { body, validationResult } = require('express-validator');

const collectionName 	= 'users';
const MainController 	= require(__path_controllers_frontend + collectionName);
const FileHelpers 		= require(__path_helpers + 'file');
const Validates			= require(__path_validates + collectionName);


router.get('/change-password', MainController.getChangePassword);
router.post('/change-password', Validates.passwordFrontendValidate(body), MainController.postChangePassword);
router.get('/profile', MainController.getProfile);
router.post('/profile', FileHelpers.upload('avatar', 'users'), Validates.formFrontendValidate(body), MainController.postProfile);


module.exports = router;