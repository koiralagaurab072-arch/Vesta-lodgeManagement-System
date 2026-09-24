const db = require('../db');

const PostActiveBooking = async (req, res) => {
    const { Guest_Id, Room_Id } = req.body;

    if (!Guest_Id || !Room_Id) {
        return res.status(400).json({
            message: "Guest_Id and Room_Id are required",
            ActiveBooking: null
        });
    }
    let conn;
    try {
        conn = await db.promise().getConnection();
        await conn.beginTransaction();
        const checkRoomStatus = `SELECT Room_Status FROM Room WHERE Room_Id = ? FOR UPDATE  `;
        const [rooms] = await conn.query(checkRoomStatus, [Room_Id]);
        if (rooms.length === 0) {
            await conn.rollback();
            return res.status(404).json({
                message: "Room not found",
                ActiveBooking: null
            });
        }
        if (rooms[0].Room_Status === 'occupied') {
            await conn.rollback();
            return res.status(409).json({
                message: "Room is already occupied",
                ActiveBooking: null
            });
        }
        const insertSql = `INSERT INTO ActiveBooking (Guest_Id, Room_Id)VALUES (?, ?) `;
        const [activeBooking] = await conn.query(
            insertSql,
            [Guest_Id, Room_Id]
        );
        const updateRoomSql = `
            UPDATE Room
            SET Room_Status = 'occupied'
            WHERE Room_Id = ?
        `;
        await conn.query(updateRoomSql, [Room_Id]);
        await conn.commit();
        return res.status(201).json({
            message: `Guest ${Guest_Id} booking is activated`,
            ActiveBooking: activeBooking.insertId
        });

    } catch (err) {
        if (conn) {
            try {
                await conn.rollback();
            } catch (rollbackError) {
                console.error('Rollback Error:', rollbackError.message);
            }
        }
        console.error('Booking Transaction Error:', err.message);
        return res.status(500).json({
            message: "Internal server error while creating booking",
            Error: err.message
        });
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

const db = require('../db');

const GetActiveBookings = async (req, res) => {
    try {
        const sql = `
            SELECT 
                ab.Booking_Id, 
                g.Full_Name, 
                r.RoomNumber,
                g.ContactNo, 
                ab.CheckInDate
            FROM activebooking ab
            INNER JOIN Guest g ON ab.Guest_Id = g.Guest_Id
            INNER JOIN Room r ON ab.Room_Id = r.Room_Id
            ORDER BY ab.CheckInDate DESC
        `;
        const [bookings] = await db.promise().query(sql);
        if (bookings.length === 0) {
            return res.status(200).json({
                message: "No active bookings found",
                bookings: null
            });
        }
        return res.status(200).json({
            message: "Active bookings retrieved successfully",
            booking: bookings
        });

    } catch (err) {
        console.error('Error fetching active bookings:', err.message);

        return res.status(500).json({
            message: "Internal server error while fetching bookings",
            Error: err.message
        });
    }
}

//GetSingleActiveBooking
const GetSingleActiveBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const sql = `SELECT * FROM activebooking WHERE booking_Id=?`
        const value = [bookingId]
        const [GetSingleActiveBooking] = await db.promise().query(sql, [value]);
        if (GetSingleActiveBooking.length === 0) {
            console.log('Booking not found');
            res.status(404).json({
                message: `Bookingid ${bookingId} not found`,
                GetSingleActiveBooking: GetSingleActiveBooking
            });
        }
    } catch (err) {
        console.error("Database or Internal Server error", err.message);
        res.status(500).json({
            message: `Failed to get activebooking `,
            Room: null
        });

    }
}

module.exports = {
    PostActiveBooking, GetActiveBookings
};