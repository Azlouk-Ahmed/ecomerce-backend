const express = require("express");
const mongoose = require("mongoose")
const app = express();
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
const adressRouter = require("./routes/adressRouter");
const productrouter = require("./routes/productRouter");
const orderRouter = require("./routes/orderRoutes");
const promotionrouter = require("./routes/promotionRoutes");
require("dotenv").config();


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
}));

app.use(express.json());

app.use('/user', userRoute);
app.use('/adress', adressRouter);
app.use('/promotion', promotionrouter);
app.use('/product', productrouter);
app.use('/order', orderRouter);


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("connected to database");
    app.listen(process.env.PORT,() => console.log("listening to "+ process.env.PORT))
}).catch((err) => {
    console.log(err); 
});
