const express = require('express');
const router = express.Router();
const {postPayment,GetAllPayment}=require('../controllers/paymentcontroller');

router.post('/',postPayment);
router.get('/',GetAllPayment);

module.exports=router;

