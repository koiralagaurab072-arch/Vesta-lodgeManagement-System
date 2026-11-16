const express=require('express');
const router=express.Router();
const {AddCategory,GetCategories,UpdateCategory,DeleteCategory}=require('../../controllers/inventorySystem/Category')

router.post('/',AddCategory);
router.get('/',GetCategories);
router.put('/:id',UpdateCategory);
router.delete('/:id',DeleteCategory);

module.exports=router;