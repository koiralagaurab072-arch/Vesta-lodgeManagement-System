const db = require('../db');
const postPayment = async (req, res) => {
    try {
        const { Booking_id, payments } = req.body;

        if (!Booking_id || !payments || !Array.isArray(payments) || payments.length === 0) {
            return res.status(400).json({
                message: "Booking_id and a payments array are required."
            });
        }
        const values = payments.map((payment) => {
            if (!payment.Amount || !payment.Paymentmethod) {
                throw new Error("Amount and Paymentmethod required for all payments.");
            }
            return [Booking_id, payment.Amount, payment.Paymentmethod];
        });

        const sql = `INSERT INTO GuestPayment (Booking_id, Amount, Paymentmethod) VALUES ?`;

        await db.promise().query(sql, [values]);

        return res.status(200).json({
            message: 'Payments added successfully'
        });

    } catch (err) {
        console.error('Payment Error:', err.message);
        const statusCode = err.message.includes("required") ? 400 : 500;
        return res.status(statusCode).json({
            message: err.message || "Internal server error during payment processing"
        });
    }
}

const GetAllPayment = async (req, res) => {
    try {
        const sql = `SELECT 
               Gp.Payment_Id, 
                g.Full_Name, 
                r.Room_NO,
                Gp.Amount,
                Gp.PaymentMethod,
                Gp.PaymentDate
            FROM GuestPayment Gp
            INNER JOIN ActiveBooking ab ON Gp.Booking_Id = ab.Booking_Id
            INNER JOIN Guest g ON ab.Guest_Id = g.Guest_Id
            INNER JOIN Room r ON ab.Room_Id=r.Room_Id
    `
        const [GetAllPayment] = await db.promise().query(sql);
        if (GetAllPayment.length === 0) {
            return res.status(404).json | ({
                message: "No payments found",
                GetAllPayment: null
            })
        }
        return res.status(200).json({
            message: 'Payments Retrive Sucesfully',
            GetAllPayment: GetAllPayment
        })
    } catch (err) {
        console.error('Error fetching active bookings:', err.message);

        return res.status(500).json({
            message: "Internal server error while fetching Payments",
            Error: err.message
        });
    }
}

module.exports={postPayment,GetAllPayment};
