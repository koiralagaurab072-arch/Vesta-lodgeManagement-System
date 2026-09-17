const db = require('../db');

const RoomTable = () => {
    const sql = `CREATE TABLE IF NOT EXIST Room(
    Room_Id PRIMARY KEY AUTO_INCREMENT,
    Room_NO INT UNIQUE NOT NULL,
    Room_Price INT,
    Room_Type VARCHAR(50),
    )`;

    db.query(sql, (err) => {
        if (err) {
            console.log("Error Occur while Creating RoomTable", err);
            return;
        }
        console.log("RoomTable Created Sucessfully");
    })
}
module.exports=RoomTable;

