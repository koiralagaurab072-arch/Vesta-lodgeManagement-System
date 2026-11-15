const express = require('express');
const router = express.Router();
const { PostActiveBooking, GetActiveBookings,GetSingleActiveBooking}=require("../controllers/BookingController");

router.post("/",PostActiveBooking);
router.get("/",GetActiveBookings);
router.get("/:Booking_Id",GetSingleActiveBooking);

module.exports=router;