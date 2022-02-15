const express 		= require('express');
const router 		= express.Router();

const MainController = require(__path_controllers_admin + 'dashboard');

/* GET home page. */
router.get('(/dashboard)?', MainController.index);

module.exports = router;
