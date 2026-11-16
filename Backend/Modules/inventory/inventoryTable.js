const db=require('../../db');

const InventoryTable=()=>{
    const sql =`CREATE table IF NOT EXISTS Inventory(
    Inventory_Id INT PRIMARY KEY AUTO_INCREMENT,
    Product_Id INT NOT NULL,
    Batch_No VARCHAR(50) NOT NULL,
    Quantity INT NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    Entry_Date DATETIME DEFAULT CURRENT_TIMESTAMP,
    Expiry_Date DATE NOT NULL,
    FOREIGN KEY (Product_Id) REFERENCES Products(Product_Id)
    );`



        db.query(sql, err => {
        if (err) {
            console.log("error occur while creating InventoryTable", err.message);
            return
        }
        console.log('inventoryTable Created Sucessfully');

    })
}

module.exports=InventoryTable;