const db = require('../../db');

const AddCategory = async (req, res) => {
    const { Category_Name } = req.body;
    if (!Category_Name) return res.status(400).json({ message: "Category_Name is required" });

    try {
        const sql = `INSERT INTO Category (Category_Name) VALUES (?)`;
        const [result] = await db.promise().query(sql, [Category_Name]);
        return res.status(201).json({ message: "Category added successfully", Category: result.insertId });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') 
            return res.status(409).json({ message: "Category already exists" });
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const GetCategories = async (req, res) => {
    try {
        const [categories] = await db.promise().query(`SELECT * FROM Category`);
        if(categories.length === 0){
            return res.status(404).json({message:'no categories found'})
        }
        return res.status(200).json(categories);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const UpdateCategory = async (req, res) => {
    const { id } = req.params;
    const { Category_Name } = req.body;
    if (!Category_Name) return res.status(400).json({ message: "Category_Name is required" });

    try {
        const sql = `UPDATE Category SET Category_Name = ? WHERE Category_Id = ?`;
        const [result] = await db.promise().query(sql, [Category_Name, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Category not found" });
        return res.status(200).json({ message: "Category updated successfully" });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: "Category name already taken" });
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const DeleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = `DELETE FROM Category WHERE Category_Id = ?`;
        const [result] = await db.promise().query(sql, [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Category not found" });
        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
      
        if (err.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(409).json({ message: "Cannot delete category because it contains products." });
        }
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

module.exports={AddCategory,GetCategories,UpdateCategory,DeleteCategory};