const db=require('../db');

const HotelExpensesTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS GuestExpenses(
        HotelExpenses_Id INT PRIMARY KEY AUTO_INCREMENT,
        ExpensesType VARCHAR(100),
        cost INT, 
        Description  TEXT,
        Date DATETIME DEFAULT CURRENT_TIMESTAMP
    )`;
    
    db.query(sql, (err) => {
        if (err) {
            console.log("Error seen while creating HotelExpenses table", err)
            return;
        }

        console.log(" HotelExpenses table created sucessfully")
    });
}

module.exports=HotelExpensesTable;
