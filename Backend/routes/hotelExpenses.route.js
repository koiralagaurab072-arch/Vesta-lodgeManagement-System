const express = require('express');
const router = express.Router();

const {     GetAllHotelExpenses, 
    PostHotelExpenses,
    UpdateHotelExpense,
    DeleteHotelExpense }=require('./../controllers/hootelExpenses');

    router.post('/',PostHotelExpenses);
    router.get('/',GetAllHotelExpenses);
    router.put('/:id',UpdateHotelExpense);
    router.delete('/:id',DeleteHotelExpense);

    module.exports=router;