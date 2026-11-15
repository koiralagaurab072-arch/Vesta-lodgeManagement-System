const express = require('express');
const router=express.Router();

const {GetGuestHistory,GetSingleGuestHistory}=require('../controllers/GuestHistory');

router.get('/',GetGuestHistory);
router.get('/:Booking_id',GetSingleGuestHistory);

module.exports=router;