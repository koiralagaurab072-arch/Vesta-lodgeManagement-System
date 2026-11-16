const db = require('../../db')

const CategoryTable = () => {

    const sql = `CREATE TABLE IF NOT EXISTS category (
     Category_Id INT PRIMARY KEY AUTO_INCREMENT,
    Category_Name VARCHAR(100) NOT NULL UNIQUE
     )`;

    db.query(sql, err => {
        if (err) {
            console.log("error occur while creating categoryTable", err.message);
            return
        }
        console.log('categoryTable Created Sucessfully');

    })
}

module.exports = CategoryTable;