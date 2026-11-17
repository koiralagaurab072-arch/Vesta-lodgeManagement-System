const db=require('../../db');


const inventoryUses=()=>{

    sql=`CREATE TABLE IF NOT EXISTS InventoryUsage (
    Usage_Id INT PRIMARY KEY AUTO_INCREMENT,
    Inventory_Id INT NOT NULL,  
    Product_Id INT NOT NULL,    
    Quantity_Used INT NOT NULL,
    Usage_Date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Inventory_Id) REFERENCES Inventory(Inventory_Id),
    FOREIGN KEY (Product_Id) REFERENCES Products(Product_Id)
);`
    db.query(sql,err=>{

        if(err){
          console.log("error occur while creating InventoryUsesTable", err.message);
            return
        }
        console.log('InventoryUses Created  Sucessfully');

    })


}

module.exports=inventoryUses;