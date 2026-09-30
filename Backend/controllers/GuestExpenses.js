const db = require('../db');

const PostCustomerExpenses = async (req, res) => {
    try {
        const { Booking_id, Expenses } = req.body;
        const Values = Expenses.map((expenses) => {
            Booking_id,
                expenses.ExpensesType,
                expenses.Quantity,
                expenses.Unit_Price,
                expenses.quantity * expenses.Unit_Price
        })
        const sql = `INSERT INTO GuestExpenses(Booking_id ,ExpensesType , Quantity,Unit_price, sub_total )Values(?,?,?,?)`;
        const [GuestExpenses] = await db.promise().query(sql, Values);
        return res.status(201).json({
            message: "Expenses added sucessffully",
            GuestExpenses: GuestExpenses
        })
    } catch (err) {
        console.log("Internal server error", err.message);
        return res.status(400).json({
            message: "internal server error",
            Error: err.message,
        })
    }
}

const GetAllCustomerExpenses=async(req,res)=>{
    
}