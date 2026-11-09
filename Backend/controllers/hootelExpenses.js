const db = require("../db");


const PostHotelExpenses = async (req, res) => {
    try {
        const { Expenses } = req.body;
        
        const Values = Expenses.map((expense) => {
            return [
                expense.ExpensesType,
                expense.cost, 
                expense.Description || null
            ];
        });
        
        const sql = `INSERT INTO HotelExpenses (ExpensesType, cost, Description) VALUES ?`;
        
        const [hotelExpenses] = await db.promise().query(sql, [Values]);
        
        return res.status(201).json({
            message: "Hotel expenses added successfully",
            HotelExpenses: hotelExpenses
        });
    } catch (err) {
        console.log("Internal server error", err.message);
        return res.status(400).json({
            message: "Internal server error",
            Error: err.message,
        });
    }
};


const GetAllHotelExpenses = async (req, res) => {
    try {
        const sql = `
            SELECT 
                HotelExpenses_Id,
                ExpensesType,
                cost,
                Description,
                Date AS ExpenseDate
            FROM HotelExpenses
        `;
        
        const [allExpenses] = await db.promise().query(sql);
        
        if (allExpenses.length === 0) {
            return res.status(404).json({
                message: "No hotel expenses found",
                Expenses: []
            });
        }
        
        return res.status(200).json({
            message: "Hotel expenses retrieved successfully",
            Expenses: allExpenses
        });
        
    } catch (err) {
        console.error("Error fetching hotel expenses:", err.message);
        return res.status(500).json({
            message: "Internal server error while fetching hotel expenses",
            Error: err.message
        });
    }
};


const UpdateHotelExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { ExpensesType, cost, Description } = req.body;

        const sql = `
            UPDATE HotelExpenses 
            SET ExpensesType = ?, cost = ?, Description = ? 
            WHERE HotelExpenses_Id = ?
        `;
        
        const [result] = await db.promise().query(sql, [ExpensesType, cost, Description, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Hotel expense not found"
            });
        }

        return res.status(200).json({
            message: "Hotel expense updated successfully"
        });
    } catch (err) {
        console.error("Error updating hotel expense:", err.message);
        return res.status(500).json({
            message: "Internal server error while updating hotel expense",
            Error: err.message
        });
    }
};


const DeleteHotelExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = `DELETE FROM HotelExpenses WHERE HotelExpenses_Id = ?`;
        const [result] = await db.promise().query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Hotel expense not found"
            });
        }

        return res.status(200).json({
            message: "Hotel expense deleted successfully"
        });
    } catch (err) {
        console.error("Error deleting hotel expense:", err.message);
        return res.status(500).json({
            message: "Internal server error while deleting hotel expense",
            Error: err.message
        });
    }
};

module.exports = { 
    GetAllHotelExpenses, 
    PostHotelExpenses,
    UpdateHotelExpense,
    DeleteHotelExpense
};