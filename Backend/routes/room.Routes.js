const express = require('express');
const router = express.Router();
const { CreateRoom, GetAllRoom, GetSingleRoom, UpdateRoom, DeleteRoom } = require('../controllers/roomController')

router.post('/', CreateRoom);
router.get('/', GetAllRoom);
router.get('/:RoomNO', GetSingleRoom);
router.put('/:id', UpdateRoom);
router.delete('/:id', DeleteRoom);

module.exports = router;