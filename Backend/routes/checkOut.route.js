const express=require('express');
const router=express.Router();

const {CheckoutGuest}=require('../controllers/CheakOut');

    router.post('/',CheckoutGuest);


    module.exports=router;