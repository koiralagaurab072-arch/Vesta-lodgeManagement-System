const express=require('express');
const router=express.Router();

const {GetDeductionHistory}=require('../../controllers/inventorySystem/inventory')

router.get('/',GetDeductionHistory);

module.exports=router;