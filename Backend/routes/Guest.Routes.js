const express = require('express');
const router = express.Router();
const { PostGuestInfo, GetAllGuest, GetSingleGuest } = require('../controllers/GuesController');




router.post('/', PostGuestInfo);
router.get('/', GetAllGuest);
router.get('/:guestName', GetSingleGuest);

module.exports=router;