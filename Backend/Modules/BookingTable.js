const db = require('../db');

const BookingTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS Booking(
        Booking_Id INT PRIMARY KEY AUTO_INCREMENT,
        Guest_Id INT,
        Room_Id INT,
        CheckInDate DATE,
        CheckOutDate DATE,
        FOREIGN KEY (Guest_Id) REFERENCES Guest(Guest_Id),
        FOREIGN KEY (Room_Id) REFERENCES Room(Room_Id)
    )`;

    db.query(sql, (err) => {
        if (err) {
            console.log("Error occurred while creating BookingTable:", err.message);
            return;
        }
        console.log('BookingTable Created Successfully');
    });
}

module.exports = BookingTable;