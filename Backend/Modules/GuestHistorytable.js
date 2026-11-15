const db=require('../db');

const guestHistory=()=>{

    const sql=`CREATE TABLE IF NOT EXISTS GuestHistory (
    History_Id INT PRIMARY KEY AUTO_INCREMENT,
    Old_Booking_Id INT,
    Guest_Id INT,
    Room_Id INT,
    CheckIn_Date DATETIME,
    CheckOut_Date DATETIME DEFAULT CURRENT_TIMESTAMP,
    Total_Expense DECIMAL(10,2),
    Total_Paid DECIMAL(10,2),
    Expense_Details JSON,
    Payment_Details JSON
);`


   db.query(sql, (err) => {
        if (err) {
            console.log("Error Occur while Creating GuestHistoryTable", err.message);
            return;
        }
        console.log('GuestHistoryTable Created Sucessfully')
    })
}

module.exports=guestHistory;