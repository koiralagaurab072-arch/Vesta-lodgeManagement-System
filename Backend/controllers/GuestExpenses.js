const db = require("../db");
const PostGuestExpenses = async (req, res) => {
    try {
        const { Booking_id, Expenses } = req.body;
        
        const Values = Expenses.map((expenses) => {
            return [
                Booking_id,
                expenses.ExpensesType,
                expenses.Quantity,
                expenses.Unit_Price,
                expenses.Quantity * expenses.Unit_Price 
            ];
        });
        
        const sql = `INSERT INTO GuestExpenses(Booking_id, ExpensesType, Quantity, Unit_price, sub_total) VALUES ?`;
        
        const [GuestExpenses] = await db.promise().query(sql, [Values]);
        
        return res.status(201).json({
            message: "Expenses added successfully",
            GuestExpenses: GuestExpenses
        });
    } catch (err) {
        console.log("Internal server error", err.message);
        return res.status(400).json({
            message: "Internal server error",
            Error: err.message,
        });
    }
};



const GetAllGuestExpenses = async (req, res) => {
    try {
        const sql = `
            SELECT 
                ge.Expenses_Id,
                g.Full_Name,
                r.Room_NO,
                ge.ExpensesType,
                ge.Quantity,
                ge.Unit_price,
                ge.sub_total,
                ge.Date AS ExpenseDate
            FROM GuestExpenses ge
            INNER JOIN ActiveBooking ab ON ge.Booking_id = ab.Booking_Id
            INNER JOIN Guest g ON ab.Guest_Id = g.Guest_Id
            INNER JOIN Room r ON ab.Room_Id = r.Room_Id
        `;
        
        const [allExpenses] = await db.promise().query(sql);
        
        if (allExpenses.length === 0) {
            return res.status(404).json({
                message: "No expenses found",
                Expenses: []
            });
        }
        
        return res.status(200).json({
            message: "Expenses retrieved successfully",
            Expenses: allExpenses
        });
        
    } catch (err) {
        console.error("Error fetching expenses:", err.message);
        return res.status(500).json({
            message: "Internal server error while fetching expenses",
            Error: err.message
        });
    }
};

module.exports = { 
    GetAllGuestExpenses, 
    PostGuestExpenses 
};