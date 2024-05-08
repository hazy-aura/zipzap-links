const User = require("../models/user");
const{setUser} = require('../service/auth');

async function handleUserSignUp(req, res){

    const {name, email, password }= req.body;
    await User.create({
        name,
        email,
        password,
    });

    return res.render('/');
}
async function handleUserLogin(req, res){
    const { email, password }= req.body;
    const user = await User.findOne({email,password})
     if (!user) {
       return res.render('login',{error : "Invalid Username or password"});
     }
    const token = setUser(user);
    // console.log(Token)
    res.cookie("jsontoken", token);
    return res.redirect('/');
}

module.exports= {handleUserSignUp, handleUserLogin};