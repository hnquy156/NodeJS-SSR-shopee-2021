const express = require('express');
const router = express.Router();

const collectionName = 'deliveries';
const MainController = require(__path_controllers_frontend + collectionName);


router.get('/:id', MainController.getTransportFee);

module.exports = router;