const express = require('express');
const router = express.Router();
const {CreateRoom,GetAllRoom,GetSingleRoom} = require('../controllers/roomController')

router.post('/', CreateRoom);
router.get('/', GetAllRoom);
router.get('/:RoomNO',GetSingleRoom)

module.exports=router;