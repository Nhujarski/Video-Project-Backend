const express = require('express');
const UserController = require('../controllers/User');
const router = express.Router();
router.get('/:id', UserController.findOne);
router.post('/', UserController.create);
module.exports = router;
