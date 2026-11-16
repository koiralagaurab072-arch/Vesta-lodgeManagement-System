const db=require('../../db');

const AddInventory = async (req, res) => {
    const { Product_Id, Batch_No, Quantity, Price, Expiry_Date } = req.body;
    if (!Product_Id || !Batch_No || Quantity == null || !Price || !Expiry_Date) {
        return res.status(400).json({ message: "All inventory fields are required" });
    }

    try {
        const sql = `INSERT INTO Inventory (Product_Id, Batch_No, Quantity, Price, Expiry_Date) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await db.promise().query(sql, [Product_Id, Batch_No, Quantity, Price, Expiry_Date]);
        return res.status(201).json({ message: "Stock added successfully", Inventory_Id: result.insertId });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const GetInventory = async (req, res) => {
    try {
        const sql = `
            SELECT 
                i.Inventory_Id, i.Batch_No, i.Quantity, i.Price, 
                i.Entry_Date, i.Expiry_Date, 
                 p.Product_Name, 
                c.Category_Name
            FROM Inventory i
            INNER JOIN Products p ON i.Product_Id = p.Product_Id
            INNER JOIN Category c ON p.Category_Id = c.Category_Id
            ORDER BY i.Expiry_Date ASC
        `;
        const [inventoryList] = await db.promise().query(sql);
        return res.status(200).json(inventoryList);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const UpdateInventory = async (req, res) => {
    const { id } = req.params;
    const { Product_Id, Batch_No, Quantity, Price, Expiry_Date } = req.body;
    
    try {
        const sql = `
            UPDATE Inventory 
            SET Product_Id = ?, Batch_No = ?, Quantity = ?, Price = ?, Expiry_Date = ? 
            WHERE Inventory_Id = ?
        `;
        const [result] = await db.promise().query(sql, [Product_Id, Batch_No, Quantity, Price, Expiry_Date, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Inventory record not found" });
        return res.status(200).json({ message: "Inventory updated successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const DeleteInventory = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = `DELETE FROM Inventory WHERE Inventory_Id = ?`;
        const [result] = await db.promise().query(sql, [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Inventory record not found" });
        return res.status(200).json({ message: "Inventory record deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};



const DeductInventory = async (req, res) => {
    const { Product_Id, Deduct_Quantity } = req.body;
    if (!Product_Id || !Deduct_Quantity || Deduct_Quantity <= 0) {
        return res.status(400).json({ message: "Valid Product_Id and Deduct_Quantity are required." });
    }

    let conn;
    try {
        conn = await db.promise().getConnection();
        await conn.beginTransaction();

        const getBatchesSql = `
            SELECT * FROM Inventory 
            WHERE Product_Id = ? AND Quantity > 0 
            ORDER BY Expiry_Date ASC, Entry_Date ASC 
            FOR UPDATE
        `;
        const [batches] = await conn.query(getBatchesSql, [Product_Id]);

        const totalAvailable = batches.reduce((sum, batch) => sum + batch.Quantity, 0);
        if (totalAvailable < Deduct_Quantity) {
            await conn.rollback();
            return res.status(400).json({ message: `Not enough stock. Only ${totalAvailable} available.` });
        }

        let remainingToDeduct = Deduct_Quantity;
        for (let i = 0; i < batches.length; i++) {
            let batch = batches[i];
            if (remainingToDeduct === 0) break; 

            if (batch.Quantity <= remainingToDeduct) {
                remainingToDeduct -= batch.Quantity;
                await conn.query(`UPDATE Inventory SET Quantity = 0 WHERE Inventory_Id = ?`, [batch.Inventory_Id]);
            } else {
                const newQuantity = batch.Quantity - remainingToDeduct;
                remainingToDeduct = 0;
                await conn.query(`UPDATE Inventory SET Quantity = ? WHERE Inventory_Id = ?`, [newQuantity, batch.Inventory_Id]);
            }
        }

        await conn.commit();
        return res.status(200).json({ message: `Successfully deducted ${Deduct_Quantity} items.` });

    } catch (err) {
        if (conn) await conn.rollback();
        return res.status(500).json({ message: "Internal server error during deduction", error: err.message });
    } finally {
        if (conn) conn.release();
    }
};


module.exports={AddInventory,GetInventory,UpdateInventory,DeleteInventory,DeductInventory};