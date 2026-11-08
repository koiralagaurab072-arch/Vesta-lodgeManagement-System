const db = require("../db");

const GuestExpensesTable = () => {
 
    const sql = `CREATE TABLE IF NOT EXISTS GuestExpenses(
        Expenses_Id INT PRIMARY KEY AUTO_INCREMENT,
        Booking_Id INT NOT NULL,
        ExpensesType VARCHAR(100),
        Quantity INT, 
        Unit_price INT,
        Sub_total INT,
        Date DATETIME DEFAULT CURRENT_TIMESTAMP, 
        FOREIGN KEY (Booking_Id) REFERENCES activeBooking(Booking_Id)
    )`;
    
    db.query(sql, (err) => {
        if (err) {
            console.log("Error seen while creating GuestExpenses table", err)
            return;
        }

        console.log(" Guest Expenses table created sucessfully")
    });
}

module.exports = GuestExpensesTable;