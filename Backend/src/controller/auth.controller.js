const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const redis = require('../config/redis');
// Register a new user
async function register(req,res) {
try{
  const {username,email,password,age}= req.body;
  if(!username || !email || !password || !age){
    return res.status(400).json({message: 'All fields are required'});
  }
  const existingUser = await User.findOne({$or:[{email},{username}]});
  if(existingUser){
    return res.status(400).json({message: 'Account already exists with this username or email'});
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({username,email,password: hashedPassword, age});
  if(newUser){
    const token = jwt.sign({id: newUser._id, username: newUser.username, email: newUser.email} , process.env.SECRET_KEY, {expiresIn: '1d'});
    res.cookie('token', token, {
      httpOnly: true,
    });
    return res.status(201).json({message: 'User registered successfully', token, newUser});
  }
}catch(error){
  console.error('Error during registration:', error);
  return res.status(500).json({message: 'Internal server error'});
}
}

const login = async (req,res)=>{
  try{
    const {username,password} = req.body;
    if(!username || !password){
      return res.status(400).json({message: 'Username and password are required'});
    }
    const user = await User.findOne({username}).select('+password');
    if(!user){
      return res.status(400).json({message: 'Invalid username'});
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch){
  
    return res.status(400).json({message: 'Invalid password'});
  }
 
  
  const token = jwt.sign({id: user._id, username: user.username, email: user.email} , process.env.SECRET_KEY, {expiresIn: '1d'});
  res.cookie('token', token,{
    httpOnly: true,
  });
  return res.status(200).json({message: 'Login successful', token, user});
}catch(error){
return res.status(500).json({message: 'Internal server error'});
}
}
const logout = async (req,res)=>{
  try{
  const token = req.cookies.token;
  
  if(!token){
    return res.status(400).json({message: 'No token provided'});
}
const decoded = jwt.decode(token);
  const expiry =
  decoded.exp - Math.floor(Date.now() / 1000);
await redis.set(`blacklist_${token}`,"true",{ex:expiry});
res.clearCookie('token');
return res.status(200).json({message: 'Logout successful'});
  }catch(error){
    console.error('Error during logout:', error);
    return res.status(500).json({message: 'Internal server error'});

}
}
const getMe = async (req,res)=>{
  const user = await User.findById(req.user.id);
  if(!user){
    return res.status(404).json({message: 'User not found'});
}
return res.status(200).json({user});
}
module.exports = {register, login, logout, getMe};
