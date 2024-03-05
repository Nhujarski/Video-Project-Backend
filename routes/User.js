const express = require('express');
const UserController = require('../controllers/User');
const router = express.Router();
// POST request to check userName and password
router.post('/:userName', UserController.findOne);
router.post('/', UserController.create);
module.exports = router;
