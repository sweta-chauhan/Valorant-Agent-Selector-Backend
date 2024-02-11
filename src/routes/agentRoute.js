const express = require('express');
const agentController = require('../controllers/agentController');

const router = express.Router();


router.get('/roles', agentController.roles);
router.get('/agents', agentController.agents);

module.exports = router;