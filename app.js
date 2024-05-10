require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const  flash  = require("express-flash-messages");
const session = require("express-session");
const connectDB = require("./server/config/db");

const app = express();

//connect to Database
connectDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));


//static files
app.use(express.static("public"));

//express session
app.use(
    session({
        secret:"secret",
        resave: false,
        saveUninitialized:true,
        cookie: {
            maxAge:1000 * 60 * 60 * 24 * 7, //week
        }
    })
);

//flash Messages
app.use(flash({sessionKeyName:"flashMessage"}));

//template engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

//routes
app.use("/", require("./server/routes/customer"))

//handle 404
app.get("*", function (req,res) {
    res.status(404).render("404");
})

app.listen(5000, (params) =>{
    console.log("app listening port 5000");
})