const db = require("../db");

const CheckoutGuest = async (req, res) => {
    let conn;
    try {
        const { Booking_id } = req.body;

        if (!Booking_id) {
            return res.status(400).json({ message: "Booking_id is required for checkout." });
        }

        conn = await db.promise().getConnection();
        await conn.beginTransaction();

        const [bookingRecords] = await conn.query(`SELECT * FROM ActiveBooking WHERE Booking_Id = ?`, [Booking_id]);
        if (bookingRecords.length === 0) {
            throw new Error("Booking not found");
        }
        const booking = bookingRecords[0];

        const [expenses] = await conn.query(`SELECT * FROM GuestExpenses WHERE Booking_Id = ?`, [Booking_id]);
        const totalExpense = expenses.reduce((sum, exp) => sum + Number(exp.Sub_total)||0, 0);

        const [payments] = await conn.query(`SELECT * FROM GuestPayment WHERE Booking_Id = ?`, [Booking_id]);
        const totalPaid = payments.reduce((sum, pay) => sum + Number(pay.Amount)||0, 0);

        const historySql = `
            INSERT INTO GuestHistory 
            (Old_Booking_Id, Guest_Id, Room_Id, CheckIn_Date, Total_Expense, Total_Paid, Expense_Details, Payment_Details) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        await conn.query(historySql, [
            Booking_id, 
            booking.Guest_Id, 
            booking.Room_Id, 
            booking.CheckInDate ,
            totalExpense, 
            totalPaid, 
            JSON.stringify(expenses), 
            JSON.stringify(payments)  
        ]);

        await conn.query(`UPDATE Room SET Room_Status = 'Available' WHERE Room_Id = ?`, [booking.Room_Id]);
        await conn.query(`DELETE FROM GuestExpenses WHERE Booking_Id = ?`, [Booking_id]);
        await conn.query(`DELETE FROM GuestPayment WHERE Booking_Id = ?`, [Booking_id]);
        await conn.query(`DELETE FROM ActiveBooking WHERE Booking_Id = ?`, [Booking_id]);

        await conn.commit();

        return res.status(200).json({ 
            message: "Checkout complete. Detailed history saved and active records cleared." 
        });

    } catch (err) {
        if (conn) await conn.rollback(); 
        console.error("Checkout Error:", err.message);
        const statusCode = err.message === "Booking not found" ? 404 : 500;
        return res.status(statusCode).json({ message: err.message || "Internal server error" });
    } finally {
        if (conn) conn.release();
    }
};



module.exports = {
    CheckoutGuest
};