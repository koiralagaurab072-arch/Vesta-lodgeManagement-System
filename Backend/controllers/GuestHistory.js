
const db=require('../db');



const GetGuestHistory = async (req, res) => {
    try {
        const sql = `
            SELECT 
                gh.Old_Booking_Id AS Booking_Id,
                r.Room_NO AS Room_Number,
                g.Full_Name AS Guest_Name,
                gh.CheckIn_Date,
                gh.CheckOut_Date,
                gh.Total_Expense,
                gh.Total_Paid,
                gh.Expense_Details,
                gh.Payment_Details
            FROM GuestHistory gh
            INNER JOIN Guest g ON gh.Guest_Id = g.Guest_Id
            INNER JOIN Room r ON gh.Room_Id = r.Room_Id
            ORDER BY gh.CheckOut_Date DESC
        `;
        
        const [historyRecords] = await db.promise().query(sql);
        
        if (historyRecords.length === 0) {
            return res.status(404).json({ message: "No history found", history: [] });
        }
        
        return res.status(200).json({
            message: "History retrieved successfully",
            history: historyRecords
        });

    } catch (err) {
        console.error("History Fetch Error:", err.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const GetSingleGuestHistory = async (req, res) => {
    try {
    
        const { Booking_id } = req.params; 

        const sql = `
            SELECT 
                gh.Old_Booking_Id AS Booking_Id,
                r.Room_NO AS Room_Number,
                g.Full_Name AS Guest_Name,
                gh.CheckIn_Date,
                gh.CheckOut_Date,
                gh.Total_Expense,
                gh.Total_Paid,
                gh.Expense_Details,
                gh.Payment_Details
            FROM GuestHistory gh
            INNER JOIN Guest g ON gh.Guest_Id = g.Guest_Id
            INNER JOIN Room r ON gh.Room_Id = r.Room_Id
            WHERE gh.Old_Booking_Id = ?
        `;
        
        const [historyRecord] = await db.promise().query(sql, [Booking_id]);
        
        if (historyRecord.length === 0) {
            return res.status(404).json({ message: `No history found for Booking ID: ${Booking_id}` });
        }
        
        return res.status(200).json({
            message: "Single history retrieved successfully",
            history: historyRecord[0] 
        });

    } catch (err) {
        console.error("Single History Fetch Error:", err.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports={GetGuestHistory,GetSingleGuestHistory};