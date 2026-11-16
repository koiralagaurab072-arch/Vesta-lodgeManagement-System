const express=require('express');
const router=express.Router();

const {DeductInventory}=require('../../controllers/inventorySystem/inventory')

 router.post('/',DeductInventory);

 module.exports=router;