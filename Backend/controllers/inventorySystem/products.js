const db=require('../../db');

const AddProduct = async (req, res) => {
    const { Category_Id, Product_Name } = req.body;
    if (!Category_Id || !Product_Name) return res.status(400).json({ message: "Category_Id and Product_Name are required" });

    try {
        const sql = `INSERT INTO Products (Category_Id, Product_Name) VALUES (?, ?)`;
        const [result] = await db.promise().query(sql, [Category_Id, Product_Name]);
        return res.status(201).json({ message: "Product added successfully", Product_Id: result.insertId });
    } catch (err) {
          if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: ` This product already exists in product list` });
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const GetProducts = async (req, res) => {
    try {
        const sql = `
            SELECT p.Product_Id, p.Product_Name,c.Category_Name 
            FROM Products p
            INNER JOIN Category c ON p.Category_Id = c.Category_Id
            ORDER BY c.Category_Name, p.Product_Name
        `;
        const [products] = await db.promise().query(sql);
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const UpdateProduct = async (req, res) => {
    const { id } = req.params;
    const { Category_Id, Product_Name } = req.body;
    if (!Category_Id || !Product_Name) return res.status(400).json({ message: "Category_Id and Product_Name required" });

    try {
        const sql = `UPDATE Products SET Category_Id = ?, Product_Name = ? WHERE Product_Id = ?`;
        const [result] = await db.promise().query(sql, [Category_Id, Product_Name, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found" });
        return res.status(200).json({ message: "Product updated successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const DeleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = `DELETE FROM Products WHERE Product_Id = ?`;
        const [result] = await db.promise().query(sql, [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found" });
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        if (err.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(409).json({ message: "Cannot delete product because inventory stock exists for it." });
        }
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

module.exports={AddProduct,GetProducts,UpdateProduct,DeleteProduct};