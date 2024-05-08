const jsonwebtoken = require('jsonwebtoken');
const secret = "Ayush@1223##";

function setUser(user) {
   return jsonwebtoken.sign({
    _id : user._id,
    email: user.email,
  },secret)
}

function getUser(token) {

  // console.log(token)
  if (!token) {
    return null;
  }
  try{
    return jsonwebtoken.verify(token,secret)
  }
  catch(error){
    console.log(error)
    return null;
  }
  
}

module.exports = {
  setUser,
  getUser,
};
