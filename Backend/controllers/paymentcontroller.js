const db = require('../db');
const postPayment = async (req, res,) => {
    try {
        const { Booking_id, payments } = req.body;
        if (!Booking_id || !payments || !Array.isArray(payments) || payments.length === 0) {
            return res.status(400).json({
                message: "Booking_id and a payments array are required."
            });
        }
        
        const sql = `INSERT INTO GuestPayment (Booking_id, Amount, Paymentmethod, PaymentDate) VALUES (?, ?, ?, CURDATE())`;
    
        for (const payment of payments) {
            if (!payment.Amount || !payment.Paymentmethod) {
                return res.status(400).json({ message: "Amount and Paymentmethod required for all payments." });
            }
            await db.promise().query(sql, [Booking_id, payment.Amount, payment.Paymentmethod]);
        }
        
        return res.status(200).json({
            message: 'Payments added successfully'
        });
        
    } catch (err) {
        console.error('Payment Error:', err.message);
        return res.status(500).json({
            message: "Internal server error during payment processing"
        });
    }
}

const GetAllPayment = async (req, res) => {

    try {
        const sql = `SELECT 
               Gp.Payment_Id, 
                ab.Full_Name, 
                ab.RoomNumber,
                Gp.Amount,
                Gp.PaymentMethod
            FROM GuestPayment Gp
            INNER JOIN ActiveBooking ab ON Gp.Booking_Id = ab.Booking_Id;
    `
        const [GetAllPayment] = await db.promise().query(sql);
        if (GetAllPayment === 0) {
            return res.status(404).json | ({
                message: "No payments found",
                GetAllPayment: null
            })
        }
        return res.status(200).json({
            message: 'Payments Retrive Sucesfully',
            GetAllPayment: GetAllPayment[0]
        })
    } catch (err) {
        console.error('Error fetching active bookings:', err.message);

        return res.status(500).json({
            message: "Internal server error while fetching Payments",
            Error: err.message
        });
    }
}

