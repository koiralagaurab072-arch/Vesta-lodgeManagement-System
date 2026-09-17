const db = require('../db');

const GuestTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS Guest(
Guest_Id INT PRIMARY KEY AUTO_INCREMENT,
Full_Name VARCHAR(50) NOT NULL,
ContactNo VARCHAR(15),
Identity_NO Varchar(50),
IdType VARCHAR(50),
Address VARCHAR(50) 
    )`;
    db.query(sql, (err) => {
        if (err) {
            console.log("Error Occur while Creating CustomerTable", err.message);
            return;
        }
        console.log('GuestTable Created Sucessfully')
    })
}
module.exports = GuestTable;