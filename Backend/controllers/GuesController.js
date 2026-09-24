const db = require('../db')

const PostGuestInfo = async (req, res) => {
    try {
        const { Full_Name, ContactNo, Identity_NO, IdType, Address } = req.body;
        if (!Full_Name || !ContactNo || !Address) {
            return res.status(400).json({
                message: "FullNmae , ContactNO , Address are required.",
                Guest: null
            });
        }
        if (ContactNo.length < 10) {
            console.log('invalid contact no');
            return res.status(422).json({
                message: "invalid phone number",
                Guest: null
            })
        }

        const values = [
            Full_Name, ContactNo, Identity_NO, IdType, Address
        ]
        const sql = `INSERT INTO Guest
            ( Full_Name,ContactNo,Identity_NO,IdType,Address) VALUES (?,?,?,?,?)`;
        const [result] = await db.promise().query(sql, values);
        console.log(`GuestInfo inserted into GuestTable`);
        return res.status(201).json({
            message: ` ${Full_Name} registered successfully`,
            Guest: result
        });
    } catch (err) {
        console.error("Database or Server Error", err.message);
    }
    res.status(500).json({
        message: `Failed to register  Guest named : ${req.body.Full_Name}  `,
        Error: err.message,
        Guest: null
    })
};

// Get All Guest 
const GetAllGuest = async (req, res) => {
    try {
        const sql = `SELECT * FROM Guest `;
        const [Guest] = await db.promise().query(sql);

        return res.status(200).json({
            message: 'All guest retrive sucessfully',
            guest: Guest
        })
    } catch (err) {
        console.log("Database or Internal Server Error", err.message);
        res.status(500).json({
            message: 'Failed to retrive guests data',
            guest: null
        })
    }
}


//get info with guest name 
const GetSingleGuest = async (req, res) => {

    try {
        const { guestName } = req.params
        const sql = `Select * from Guest WHERE Full_Name =?`;
        const [guest] = await db.promise().query(sql, [guestName]);
        if (guest.length === 0) {
            console.log('Guest not found');
            res.status(404).json({
                message: `Guest with name ${guestName} not found`
            });
        }
        return res.status(200).json({
            message: ` ${guestName}info retrive sucessfully`,
            guest: guest[0]
        })
    } catch (err) {
        console.error("Database or Internal Server error", err.message);
        res.status(500).json({
            message: `Failed to get searched guestInfo`,
            guest: null
        });
    }
}

module.exports = { PostGuestInfo, GetAllGuest, GetSingleGuest }


