const jwt = require('jsonwebtoken');
const redis = require('../config/redis');

async function authMiddleware(req,res,next){
  try{
    const token = req.cookies.token || req.headers['Authorization']?.split(' ')[1];
    if(!token){
      console.log('No token provided');
      return res.status(401).json({message: 'No token provided'});
    }
    const isBlacklisted = await redis.get(`blacklist_${token}`);
    if(isBlacklisted){
      return res.status(401).json({message: 'invalid token'});
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  }catch(error){
    console.error('Error during authentication:', error);
    return res.status(401).json({message: 'Invalid token'});
  }
}
module.exports = authMiddleware;