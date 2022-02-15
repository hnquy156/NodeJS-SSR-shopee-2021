const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');

const collectionName = 'auth';
const MainController = require(__path_controllers_frontend + collectionName);
const LoginValidator = require(__path_validates + 'login');
const RegisterValidator = require(__path_validates + 'register');

router.get('/no-permission', MainController.noPermission);
router.get('/logout', MainController.logout);
router.get('/register', MainController.getRegister);
router.post('/register', RegisterValidator.formValidate(body), MainController.postRegister);
router.get('/login', MainController.getLogin);
router.post('/login', LoginValidator.formValidate(body), MainController.postLogin);

module.exports = router;