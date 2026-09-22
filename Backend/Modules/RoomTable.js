const db = require('../db');

const RoomTable = () => {

    const sql = `CREATE TABLE IF NOT EXISTS Room (
        Room_Id INT PRIMARY KEY AUTO_INCREMENT,
        Room_NO INT NOT NULL UNIQUE,
        Room_Price DECIMAL(10,2),
        Room_Type VARCHAR(50),
        Room_Status ENUM('Available', 'Occupied', 'Maintenance') DEFAULT 'Available'
    )`;
    db.query(sql, (err) => {
        if (err) {
            console.log("Error occurred while creating RoomTable:", err.message);
            return;
        }
        console.log("RoomTable created successfully");
    });
}
module.exports = RoomTable;