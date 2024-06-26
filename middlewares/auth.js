const {getUser} = require('../service/auth');

async function restrictToLoggedUserOnly(req,res,next) {

    const  userUid = req.cookies?.jsontoken;
    
    if(!userUid) return res.redirect("/login");
    const user = getUser(userUid);

    if(!user) return res.redirect("/login");
    
    req.user = user;
    next();

}
async function checkAuth(req, res, next) {
    const  userUid = req.cookies?.jsontoken;
    
    const user = getUser(userUid);

    
    req.user = user;
    next();

    
}

module.exports = {restrictToLoggedUserOnly,checkAuth};