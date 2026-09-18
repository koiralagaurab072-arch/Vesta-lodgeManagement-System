const db = require('../../db')

const CategoryTable = () => {

    const sql = `CREATE TABLE IF NOT EXISTS category (
        id INT PRIMARY KEY AUTO_INCREMENT , 
        categoryName VARCHAR(30) NOT NULL 
     )`;

    db.query(sql, err => {
        if (err) {
            console.log("error occur while creating categoryTable", err.message);
            return
        }
        console.log('categoryTable Created Sucessfully');

    })
}

module.exports = CategoryTable