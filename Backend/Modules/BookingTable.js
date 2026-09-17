const db = require('../db');

const BookingTable = () => {
    const sql = `CREATE TABLE IF NOT EXIST Booking(
    Booking_id INT PRIMARY KEY Auto_INCREMENT,
    Guest_id INT UNIQUE,
    Room_id INT,
    CheakINDate Date,
    CheakOut Date,

    FOREIGN KEY (Guest_id) REFERENCES Guest(Guest_id);
    FOREIGN KEY (Booking_id) REFRENCES Booking(Booking_id);
    )`;

    db.query(sql, (err) => {
        if (err) {
            console.log("Error occur while creating BookingTable ");
            return;
        }
        console.log('GuestTable Created Sucessfully');
    })
}
module.exports = BookingTable;