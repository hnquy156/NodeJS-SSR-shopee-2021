const express = require('express');
const router = express.Router();

const collectionName = 'products'
const MainController = require(__path_controllers_frontend + collectionName);


router.get('/load-more', MainController.loadmore);
router.post('/change-like/', MainController.changeLike);
router.get('/:id', MainController.index);

module.exports = router;