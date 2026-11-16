const express = require('express');
const router = express.Router();

const {AddInventory,GetInventory,UpdateInventory,DeleteInventory}=require('../../controllers/inventorySystem/inventory');


 router.post('/',AddInventory);
 router.get('/',GetInventory);
 router.put('/:id',UpdateInventory);
 router.delete('/:id',DeleteInventory);
 

 module.exports=router;
