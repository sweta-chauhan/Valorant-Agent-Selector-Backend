const express = require('express');
const playerController = require('../controllers/playerController');

const router = express.Router();

router.get('/add-player', playerController.addNewPlayer);
router.get('/player/:playerId', playerController.getPlayer);
router.post('/lock-agent/:playerId', playerController.lockInAgent);

module.exports = router;