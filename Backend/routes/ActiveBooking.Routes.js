const express = require('express');
const router = express.Router();
const { PostActiveBooking, GetActiveBookings,GetSingleActiveBooking}=require("../controllers/BookingController");

router.post("/",PostActiveBooking);
router.get("/",GetSingleActiveBooking);
router.get("/",GetActiveBookings);

module.exports=router;