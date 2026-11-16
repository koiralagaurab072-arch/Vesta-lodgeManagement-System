const db=require('../../db');

const ProductTable=()=>{

    const sql =`CREATE table IF NOT EXISTS Products(
    Product_Id INT PRIMARY KEY AUTO_INCREMENT,
    Category_Id INT NOT NULL,
    Product_Name VARCHAR(100) NOT NULL,
    FOREIGN KEY (Category_Id) REFERENCES Category(Category_Id)
    );`

    const updateSql=`ALTER TABLE Products 
ADD CONSTRAINT unique_category_product UNIQUE (Category_Id, Product_Name);`

        db.query(sql, err => {
        if (err) {
            console.log("error occur while update ProductTable", err.message);
            return
        }
        console.log('ProductTable Created and updated  Sucessfully');
    })


}

module.exports=ProductTable;

