
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const passport = require('./password');
const { jwtauth } = require('./jwt_auth');
app.use(passport.initialize());



const GuestTable = require('./Modules/GuestTable');
const RoomTable = require('./Modules/RoomTable');
const ActiveBookingTable = require('./Modules/ActiveBookingTable');
const GuestExpensesTable = require('./Modules/GuestExpensesTable');
const PaymentTable = require('./Modules/PaymentTable');
const categoryTable = require('./Modules/inventory/categoryTable');
const HotelExpenses = require('./Modules/HotelExpensesTable');
const GuestHistoryTable=require('./Modules/GuestHistorytable');
const ProductTable=require('./Modules/inventory/productTable');
const inventoryTable=require('./Modules/inventory/inventoryTable')

//room Management
GuestTable();
RoomTable();
ActiveBookingTable();
GuestExpensesTable();
PaymentTable();
HotelExpenses();
GuestHistoryTable();

//inventory
categoryTable();
ProductTable();
inventoryTable();


//routers
const roomRoutes = require('./routes/room.Routes');
const GuestRoutes = require('./routes/Guest.Routes');
const ActiveBookingRoutes = require('./routes/ActiveBooking.Routes');
const GuestPayment = require('./routes/GuestPayemt.Routes');
const GuestExpenses = require('./routes/GuestExpensess.Routes');
const hotelExpenses=require('./routes/hotelExpenses.route');
const CheakOut=require('./routes/checkOut.route');
const GuestHistory=require('./routes/Guesthistry.route');
const login=require('./routes/login.route')
const categories=require('./routes/inventory/category.route')
const product=require('./routes/inventory/products.route')
const inventory=require('./routes/inventory/inventory.route');
const DeductInventory=require('./routes/inventory/deductInventory.route')


app.use('/login',login);
app.use('/room', jwtauth, roomRoutes);
app.use('/guest', jwtauth, GuestRoutes);
app.use('/activeBooking', jwtauth, ActiveBookingRoutes);
app.use('/guestPayment', jwtauth, GuestPayment);
app.use('/guestExpenses', jwtauth, GuestExpenses);
app.use('/hotelExpenses', jwtauth, hotelExpenses);
app.use('/checkout', jwtauth, CheakOut);
app.use('/guesthistory', jwtauth, GuestHistory);
app.use('/categories',jwtauth,categories);
app.use('/products',jwtauth,product);
app.use('/inventory',jwtauth,inventory);
app.use('/deductProduct',jwtauth,DeductInventory);


PORT =process.env.PORT||3000;
app.get('/', (req, res) => {
    res.send('Welcome to Lodge managemant System')
});

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})