const db = require('../db');

// Add room
const CreateRoom = async (req, res) => {
    try {
        const data = req.body;

        if (!data.Room_NO || !data.Room_Price || !data.Room_Type) {
            return res.status(400).json({
                message: "Room_NO, Room_Price, and Room_Type are required.",
                Room: null
            });
        }
        const values = [
            data.Room_NO,
            data.Room_Price,
            data.Room_Type,
            data.Room_Status || 'Available'
        ];
        const sql = `INSERT INTO Room (Room_NO, Room_Price, Room_Type, Room_Status) VALUES (?,?,?,?)`;
        const [result] = await db.promise().query(sql, values);
        console.log(`RoomNO ${data.Room_NO} inserted into RoomTable`);
        return res.status(201).json({
            message: `RoomNO ${data.Room_NO} created successfully`,
            Room: result
        });
    } catch (err) {
        console.error("Database or Server Error", err.message);
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: `Room No ${req.body.Room_NO} already exists.`,
                Room: null
            });
        }
        res.status(500).json({
            message: `Failed to add RoomNo ${req.body.Room_NO}`,
            Error: err.message,
            Room: null
        });
    }
};

// Retrieve all rooms
const GetAllRoom = async (req, res) => {
    try {
        const sql = `SELECT * FROM Room`;
        const [rooms] = await db.promise().query(sql);
        return res.status(200).json({
            message: "Rooms retrieved successfully",
            Rooms: rooms
        });
    } catch (err) {
        console.error("Database or Server Error", err.message);
        return res.status(500).json({
            message: "Failed to retrieve rooms",
            Error: err.message,
            Rooms: null
        });
    }
};

// Retrieve single room through room_no
const GetSingleRoom = async (req, res) => {
    try {
        const { RoomNO } = req.params;
        const sql = `SELECT * FROM Room WHERE Room_NO=?`;
        const [room] = await db.promise().query(sql, [RoomNO]);

        if (room.length === 0) {
            return res.status(404).json({
                message: `Room no ${RoomNO} not found`,
                Room: null
            });
        }
        res.status(200).json({
            message: 'Room retrieved successfully',
            Room: room[0]
        });
    } catch (err) {
        console.error("Database or Internal Server error", err.message);
        res.status(500).json({
            message: `Failed to get searched room`,
            Room: null
        });
    }
};

module.exports = { CreateRoom, GetAllRoom, GetSingleRoom };