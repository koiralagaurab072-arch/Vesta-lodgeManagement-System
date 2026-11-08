const express = require('express');
const router = express.Router();

const {     GetAllHotelExpenses, 
    PostHotelExpenses,
    UpdateHotelExpense,
    DeleteHotelExpense }=require('./../controllers/hootelExpenses');

    router.post('/',GetAllHotelExpenses);
    router.get('/',PostHotelExpenses);
    router.put('/',UpdateHotelExpense);
    router.delete('/',DeleteHotelExpense);

    module.exports=router;