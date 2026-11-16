const express=require('express');
const router=express.Router();
const {AddProduct,GetProducts,UpdateProduct,DeleteProduct}=require('../../controllers/inventorySystem/products')

router.post('/',AddProduct);
router.get('/',GetProducts);
router.put ('/',UpdateProduct);
router.delete('/',DeleteProduct);

module.exports=router;