const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

require('dotenv').config();
const GuestTable = require('./Modules/GuestTable');
const RoomTable = require('./Modules/RoomTable');
const ActiveBookingTable = require('./Modules/ActiveBookingTable');
const GuestExpensesTable = require('./Modules/GuestExpensesTable');
const PaymentTable = require('./Modules/PaymentTable');
const categoryTable = require('./Modules/inventory/categoryTable')
const HotelExpenses = require('./Modules/HotelExpenses')


//room Management
GuestTable();
RoomTable();
ActiveBookingTable();
GuestExpensesTable();
PaymentTable();
HotelExpenses();

//inventory
categoryTable();


//routers
const roomRoutes = require('./routes/room.Routes');
const GuestRoutes = require('./routes/Guest.Routes');
const ActiveBookingRoutes = require('./routes/ActiveBooking.Routes');
const GuestPayment = require('./routes/GuestPayemt.Routes');
const GuestExpenses = require('./routes/GuestExpensess.Routes');
const hotelExpenses=require('./routes/hotelExpenses.route');


app.use('/room', roomRoutes);
app.use('/guest', GuestRoutes);
app.use('/activeBooking', ActiveBookingRoutes);
app.use('/guestPayment', GuestPayment);
app.use('/guestExpenses', GuestExpenses);
app.use('/hotelExpenses',hotelExpenses);




PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Welcome to Lodge managemant System')
});

app.listen(3000, () => {
    console.log(`server is running on http://localhost:3000`);
})