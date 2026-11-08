const express = require('express');
const router = express.Router()
const {   GetAllGuestExpenses,   PostGuestExpenses }=require('../controllers/GuestExpenses')

router.post('/',PostGuestExpenses);
router.get('/',GetAllGuestExpenses);

module.exports=router;