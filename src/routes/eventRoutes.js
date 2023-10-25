const express = require("express");
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/', eventController.create);

// router.get('/:id', eventController.getEvent);

router.post('/approve/:id', eventController.approve);
router.post('/reject/:id', eventController.reject);

// router.delete('/:id', eventController.delete);

router.get('/', eventController.getAll);

module.exports = router;
