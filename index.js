const express = require('express');
const path = require('path');
const {connectToMongoDB} = require("./connect");
const app = express();
const cookieParser = require('cookie-parser');
const {restrictToLoggedUserOnly,checkAuth} = require('./middlewares/auth');

const URL = require('./models/url')
const PORT = 8001;

const userRoute = require('./routes/user');
const staticRoute = require('./routes/staticRouter');
const urlRoute = require("./routes/url");


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));




connectToMongoDB("mongodb://localhost:27017/zipzap-links")
.then(console.log("MongoDB connected by Ayush"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/url",restrictToLoggedUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth,staticRoute);

// app.get('/home', async (req,res)=>{
//     const allURLS= await URL.find({});
//     return res.render('home',{
//         urls: allURLS,
//     })
// });


app.get('/url/:shortID', async (req,res)=> {
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate({
        shortID
    }, {
        $push:{
            visitHistory:{
                timestamp: Date.now(),
            }
        }
    });
    res.redirect(entry.redirectURL);
});




app.listen(PORT, ()=>console.log("Server started at port:" + PORT));
