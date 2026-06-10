const mongoose = require('mongoose');

async function connectDB(){
  try {
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
      console.log('Connected to Database Successfully');
    })
  } catch (error) {
    console.error('Error connecting to Database:', error);
  }

}
module.exports = connectDB;