const db = require("../db");

const PaymentTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS GuestPayment (
    Payment_Id INT PRIMARY KEY AUTO_INCREMENT,
    Booking_Id INT NOT NULL,
    Amount DECIMAL(10,2) NOT NULL,
    PaymentDate DATE,
    PaymentMethod ENUM(
        'Cash',
        'Credit Card',
        'E-Sewa',
        'Bank Transfer',
        'Khalti'
    ) DEFAULT 'Cash',

    FOREIGN KEY (Booking_Id) REFERENCES Booking(Booking_Id)


  )`;

    db.query(sql, (err) => {

        if (err) {
            console.log('error seen while creating GuestPayment table', err.message)
            return;
        }
        console.log('GuestPaymentable  created sucessfully');
    })
};

module.exports = PaymentTable;






