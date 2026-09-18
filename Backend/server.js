const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');


require('dotenv').config();
const GuestTable = require('./Modules/GuestTable');
const RoomTable = require('./Modules/RoomTable');
const BookingTable = require('./Modules/BookingTable');
const GuestExpensesTable = require('./Modules/GuestExpensesTable');
const PaymentTable = require('./Modules/PaymentTable');
const categoryTable = require('./Modules/inventory/categoryTable')


//room Management
GuestTable();
RoomTable();
BookingTable();
GuestExpensesTable();
PaymentTable();

//inventory
categoryTable();


PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to Lodge managemant System')
});

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})