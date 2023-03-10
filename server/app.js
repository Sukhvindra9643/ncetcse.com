const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");

// config
if(process.env.NODE_ENV !== "PRODUCTION"){   
    require("dotenv").config({ path: "backend/config/config.env" });
}
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Route imports
const user = require("./routes/userRoute")
const registration = require("./routes/registrationRoute");
app.use("/api/v1",registration);
app.use("/api/v1",user);

app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})


// Middleware for error
app.use(errorMiddleware);


module.exports = app; 