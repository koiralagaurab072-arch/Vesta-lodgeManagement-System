const db = require('../db');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const admindetail = async (req, res) => {

    try {
        const username = "Admin";
        const password = "admin@#321";
        const sql = `INSERT INTO adminDetail(username,password)Values(username,password) `;
        const genSalt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, genSalt);
        const PepperHashPassword = hashPassword + process.env.Peeper_String
        const [admin] = await db.promise().query(sql, [username, PepperHashPassword]);
        return res.status(201).json({
            message: "Admin added sucessfully",
            admin: admin
        })
    }catch(err){
      console.log('error adding admin',err.message);
      return res.status(500).json({
        message:"internal server error"
      })
    }
}
